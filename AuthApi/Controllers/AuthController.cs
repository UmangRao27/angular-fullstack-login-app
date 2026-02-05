using Microsoft.AspNetCore.Mvc;
using AuthApi.Models;
using Dapper;
using MySql.Data.MySqlClient;

namespace AuthApi.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly string connectionstring = "Server=localhost;Database=userdb;User=root;Password=1234;";
    

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            
            using var connection = new MySqlConnection(connectionstring);

            string query = "SELECT Name, Age, Phone, Email, City FROM users where UserId = @UserId AND Password = @Password";

            var matchedUser = connection.QueryFirstOrDefault<User>(query, user);

            if(matchedUser == null){
                return Unauthorized(new { message = "Invalid UserId or Password"});
            }
            
            return Ok(matchedUser);
        }
    }
}