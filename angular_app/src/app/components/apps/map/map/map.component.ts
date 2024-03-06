import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../../../shared/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  
  constructor(private mapService: MapService) { }

  private map;
  private hospitalMarkers = [];

  ngOnInit(): void {
    this.initMap();
    this.loadHospitalData();
    this.initLegend();
  }

  initMap(): void {
    this.map = L.map('map').setView([40.0583, -74.4057], 8); // Centered on New Jersey
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    const iconDefault = L.icon({
      iconUrl: 'assets/images/marker-icon.png',
      // shadowUrl: 'assets/images/marker-shadow.png',
      iconSize: [15, 21],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      // shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  private initLegend(): void {
      const legend = L.Control.extend({
        onAdd: (map) => {
          const div = L.DomUtil.create('div', 'info legend');
          // Adding HTML content for the legend with a heading and a checkbox
          div.innerHTML = `
            <div class="container" style="height:100px;padding-top:20px; font-size:16px; border-radius: 7px; background: linear-gradient(to bottom, #f5f5f5, #e3e1e1);">
            <h5 style="font-size:bold;">Legend</h5>
              <input type="checkbox" id="hospitalToggle" checked>
              <label for="hospitalToggle">NJ Hospitals</label>
            </div>
          `;
          // Add event listener for the checkbox
          L.DomEvent.on(div.querySelector('#hospitalToggle'), 'click', (e) => {
            this.toggleHospitals(e); // Ensure this is properly bound or use arrow function
          });
    
          return div;
        },
        options: {
          position: 'topright'
        }
      });
    
      new legend().addTo(this.map);
    }
    
  
  loadHospitalData(): void {
    // Note: Adjusted to directly use the returned data structure
    this.mapService.getHospitalMapData().subscribe(data => {
      data.features.forEach(feature => {
        const coordinates = feature.geometry.coordinates;
        const marker = L.marker([coordinates[1], coordinates[0]])
          .bindPopup(feature.properties.NAME)
          .addTo(this.map);
        this.hospitalMarkers.push(marker); // Store reference to toggle visibility
      });
    }, error => {
      console.error('Failed to load hospital data:', error);
    });
  }

  toggleHospitals(event): void {
    if (event.target.checked) {
      this.hospitalMarkers.forEach(marker => marker.addTo(this.map));
    } else {
      this.hospitalMarkers.forEach(marker => this.map.removeLayer(marker));
    }
  }
}
