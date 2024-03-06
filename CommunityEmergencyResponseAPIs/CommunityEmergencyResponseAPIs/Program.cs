using CommunityEmergencyResponseAPIs.Models;
using CommunityEmergencyResponseAPIs.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var services = builder.Services;

services.AddScoped<IUserService, UserService>();
services.AddSignalR();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<EmergencyResponseDbContext>(
    o => o.UseNpgsql(builder.Configuration.GetConnectionString("PgDbConnection")));

builder.Services.AddCors((options) =>
{
    options.AddPolicy("default", (options) =>
    {
        options.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("default");

app.MapControllers();

app.MapHub<ChatHub>("/chatHub");

app.Run();
