# Community Emergency Response App- .NET, Angular and PostgreSQL

The Community Emergency Response App (CERA) is a project aimed at enhancing community support during emergencies. The app enables individuals within a community to volunteer and help each other during times of need. Whether it's a medical emergency, a traffic jam involving emergency services, or simply needing assistance, CERA connects people to provide mutual aid and support.

### Technologies Used

- **C# .NET 8:** Backend development framework.
- **Angular 15:** Frontend JavaScript framework.
- **PostgreSQL 15.2:** Relational database management system.
- **SignalR for Users to Chat with Volunteers:** Chat feature(Work in Progress).

### APIs Used

- **OSM Maps with GeoApify API for Reverse GeoCoding to get Location of the user:** https://apidocs.geoapify.com/docs/geocoding/reverse-geocoding/#about
- **Twilio for SMS notifications:** https://www.twilio.com/docs/messaging
- **Open AI for Chat with AI:** https://platform.openai.com/playground
- **Health Site for Healthcare facilities in US:** https://github.com/healthsites/healthsites/wiki/API
- **As the above health site API was for the entire US, I added Jersey specific Data:** https://njogis-newjersey.opendata.arcgis.com/datasets/newjersey::hospitals-in-nj/explore 


## Key Features

### SOS Button and Dashboard 
- Instantly send SMS alerts to volunteers in your zip code area.(Location may not be accurate as the API is open source and free)
- Activate in emergencies to request immediate assistance.
- Click [here](#dashboard) to see the screenshot

### Volunteer Network
- Join the community of volunteers willing to assist others in need.
- Receive alerts and notifications about emergencies in your area.
- Click [here](#volunteers-list) to see the screenshot

### Chat Support
- Connect with an AI chatbot or human volunteers to ask questions or seek assistance.
- Get real-time responses and support.
- Click [here](#chat) to see the screenshot

### Map Feature
- Explore nearby healthcare facilities and resources in New Jersey(Can be expanded to other states).
- Filter and search for specific facilities based on your requirements(To be added).
- Click [here](#map) to see the screenshot

### Resource Page
- Get information on facilities around you, emergency numbers, NGOs, etc.
- Click [here](#resources) to see the screenshot

## Installation of libraries and running

### For Angular
Make sure you have Node(here version 20.11.1) and Angular installed on your device. "npm install" will install all packages and their versions mentioned in 'package.json' file.

```
git clone https://github.com/MalvikaShetty/community-emergency-response-app.git
npm install
npm update --save
ng serve
```

### For .NET 8
The NuGet Packages installed using Visual Studio 2022 were-
- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.Design
- Npgsql.EntityFrameworkCore.PostgreSQL
- Swashbuckle.AspNetCore
- System.Diagnostics.Tools
- Twilio
- BCrypt.Net-Next
- Microsoft.AspNetCore.SignalR.Common

Once all is done, run using the IDE - IIS Express/https

### Dashboard
![dashboardPage](https://github.com/MalvikaShetty/community-emergency-response-app/assets/66647891/543efcf3-876d-4e1c-bea0-1f9481e456c5)

#### On Click SOS Button
![onClickSOS](https://github.com/MalvikaShetty/community-emergency-response-app/assets/66647891/1a7d765e-50ca-4906-a966-df9740a5aa7b)
![SMSAlertPhone](https://github.com/MalvikaShetty/community-emergency-response-app/assets/66647891/abaea5ac-7776-46c0-a75d-1d43edb84fd5)

### Volunteers List
![VolunteersPage](https://github.com/MalvikaShetty/community-emergency-response-app/assets/66647891/97648ab4-815e-43ad-9514-81ebd650a2db)

### Add Volunteers
![AddVolunteerPage](https://github.com/MalvikaShetty/community-emergency-response-app/assets/66647891/21e48596-a62f-4673-b24f-db9246f62c8e)

### Chat
![ChatWithAI](https://github.com/MalvikaShetty/community-emergency-response-app/assets/66647891/2faa3ad2-dab0-47c6-8048-34d58b4bd36e)

#### Dark Mode
![darkMode](https://github.com/MalvikaShetty/community-emergency-response-app/assets/66647891/5894e896-a561-4176-a6db-f75d6f8f6949)

### Map
![MapPage](https://github.com/MalvikaShetty/community-emergency-response-app/assets/66647891/d9c50825-32d5-4e69-8172-cc21004e49e9)

### Resources
![ResourcesPage](https://github.com/MalvikaShetty/community-emergency-response-app/assets/66647891/f1e8d8fc-0ec4-4a0d-bdcc-ac610d196cb9)

### Login and Register

![LoginPage](https://github.com/MalvikaShetty/community-emergency-response-app/assets/66647891/0879e8c5-94ed-4d44-8c60-31bd88cf9154)
![RegisterPage](https://github.com/MalvikaShetty/community-emergency-response-app/assets/66647891/6c42bd72-c809-40c5-8b44-271e603f3b71)

### Volunteer Button to let other Volunteers know
![VolunteerOnMyWayButton](https://github.com/MalvikaShetty/community-emergency-response-app/assets/66647891/db8c7e30-ba5b-497e-aed4-fdf4222dc211)

![VolunteerAlert](https://github.com/MalvikaShetty/community-emergency-response-app/assets/66647891/615f13e8-a437-4d2c-b14b-d3a940adecab)


## How It Works

1. **Emergency Alert**: When facing an emergency, users can press the SOS button to send an alert to nearby volunteers via SMS.

2. **Volunteer Response**: Volunteers receive alerts and can respond to emergencies based on their availability and proximity.

3. **Chat Support**: Users can chat with an AI or human volunteer to get assistance, ask questions, or seek advice.

4. **Map Feature**: Users can access a map to locate nearby healthcare facilities and resources in New Jersey, with options to filter and search based on specific criteria.
 
5. **Get Resources**: Users can explore this page to get information/phone numbers/websites of nearby healthcare facilities and emergency numbers of the particular area.


## How to Use

1. **Sign Up**: Users can sign up to become volunteers or access the app as a regular user.

2. **SOS Activation**: In emergencies, users can activate the SOS button to request assistance.

3. **Chat Support**: Users can initiate a chat session to get real-time support or information.

4. **Map Navigation**: Users can explore the map feature to find nearby healthcare facilities and resources.
   
## Future Enhancements

- **Additional Filters**: Add more filters to the map feature for enhanced search capabilities.
- **Improved Chatbot**: Enhance the AI chatbot's capabilities to provide better assistance and support.
- **Community Events**: Incorporate features to organize community events and volunteer initiatives.

## Contributing

Contributions to the project are welcome! Whether it's bug fixes, feature enhancements, or documentation improvements, feel free to contribute by submitting pull requests.
Feel free to use, modify, and distribute the code for personal or commercial purposes.

## Contact

For questions, feedback, or support, please contact [shettymalvika11@gmail.com](shettymalvika11@gmail.com).

