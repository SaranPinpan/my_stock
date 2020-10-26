using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController] // [] is an annotations
    [Route("user")]
    // [Authorize]
    public class UserController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IWebHostEnvironment WebHostEnvironment;
        public UserController(DataContext dataContext, IWebHostEnvironment WebHostEnvironment)  //select variabel then, press 'ctrl+.' and select initialize field from parameter
        {
            this.WebHostEnvironment = WebHostEnvironment;
            this.dataContext = dataContext;
        }

        // localhost:port/products/{parameter}
        [HttpGet("{id}")]
        public IActionResult GetUserInfo(int id) //fixed path type as int
        {
            try
            {
                var result = dataContext.Users.Find(id); // select * from product where {id}
                if (result == null)
                {
                    return NotFound(); // status 404
                }
                return Ok(result);  // status 200
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpGet("images/{name}")]
        public IActionResult UserImage(string name)
        {
            return File($"~/images/{name}", "image/jpg");
            //return File($"~/images/{name}", "image/jpg", "xxxx.jpg");
        }

        [HttpPut("{id}")]
        public IActionResult EditUserInfo(int id, [FromForm] Users user, IFormFile formFile)
        {
            try
            {
                var result = dataContext.Users.Find(id);
                if (result == null)
                {
                    return NotFound(); // not found, return 404
                }

                result.Username = user.Username;

                string fileName = UploadUserImage(formFile);
                if (!String.IsNullOrEmpty(fileName))
                {
                    result.Image = fileName;
                }

                dataContext.Entry(result).State = EntityState.Modified;
                dataContext.SaveChanges();
                return Ok(result);
            }
            catch (Exception error)
            {
                return StatusCode(500, new { message = error });
            }
        }

        // Upload image
        public string UploadUserImage(IFormFile image)  // Copy image to path
        {
            string fileName = null;

            if (image != null && image.Length > 0)
            {
                string filePath = WebHostEnvironment.WebRootPath + "/images/";  // Access images path in the project
                fileName = Guid.NewGuid().ToString() + System.IO.Path.GetExtension(image.FileName); // unique name
                string fullPath = filePath + fileName;
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    image.CopyTo(stream);
                    stream.Flush();
                }
            }
            return fileName;
        }
    }
    
}
