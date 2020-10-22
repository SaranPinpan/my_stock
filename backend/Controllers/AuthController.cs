using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using backend.Data;
using backend.Installers;
using backend.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [ApiController] // [] is annotations
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext dataContext;

        private readonly JwtSettings jwtSettings;

        public AuthController(DataContext dataContext, JwtSettings jwtSettings)
        {
            this.dataContext = dataContext;
            this.jwtSettings = jwtSettings;
        }

        //localhost:port/auth/login
        [HttpPost("login")] //fix path
        public IActionResult Login([FromBody] Users model)
        {
            try
            {
                var result = dataContext.Users.SingleOrDefault(u => u.Username == model.Username); // as u == username
                if (result != null && VerifyPassword(result.Password, model.Password)) //VerifyPassword(hashed password, input password)
                {
                    return Ok(new { token = BuildToken(result) });
                }

                return Unauthorized(); // status 401
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        //localhost:port/auth/register
        [HttpPost("register")]
        public IActionResult Register([FromBody] Users model)
        {
            try
            {
                model.Password = CreatePasswordHash(model.Password);
                dataContext.Users.Add(model);
                dataContext.SaveChanges();

                return Ok(); // return status 200
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        private string CreatePasswordHash(string password)
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            return $"{Convert.ToBase64String(salt)}.{hashed}";
        }

        public bool VerifyPassword(string hash, string password)
        {
            var parts = hash.Split('.', 2);

            if (parts.Length != 2)
            {
                return false;
            }

            var salt = Convert.FromBase64String(parts[0]);
            var passwordHash = parts[1];

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return passwordHash == hashed;
        }

        private string BuildToken(Users user)
        {
            // key is case-sensitive
            var claims = new[] {                            // *** This is Payload ***
                new Claim("username", user.Username), 
                new Claim("name", "Saran"),
                new Claim("role", user.Position),
            };
            var expires = DateTime.Now.AddDays(Convert.ToDouble(jwtSettings.Expire));  // fetch expire date from JWT config file  # eg: 30 days
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings.Issuer,
                audience: jwtSettings.Audience,
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}