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
    [Route("products")]
    [Authorize]
    public class ProductController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IWebHostEnvironment WebHostEnvironment;
        public ProductController(DataContext dataContext, IWebHostEnvironment WebHostEnvironment)  //select variabel then, press 'ctrl+.' and select initialize field from parameter
        {
            this.WebHostEnvironment = WebHostEnvironment;
            this.dataContext = dataContext;
        }

        // localhost:port/products
        [HttpGet] //Cannot duplicate
        public IActionResult GetAllProduct()
        {
            try
            {
                return Ok(dataContext.Products.ToList());  // select * from product
                // return Ok(dataContext.Products.OrderByDescending(p => p.ProductId)); // Order by ProductId
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // localhost:port/products/{parameter}
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id) //fixed path type as int
        {
            try
            {
                var result = dataContext.Products.Find(id); // select * from product where {id}
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

        // localhost:port/products/{parameter}
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id) //fixed path type as int
        {
            try
            {
                var result = dataContext.Products.Find(id);
                if (result == null)
                {
                    return NotFound(); // status 404
                }

                dataContext.Products.Remove(result); // delete from product where {id}
                dataContext.SaveChanges(); // delete from DB
                return NoContent();  // status 204
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [AllowAnonymous] // no need to authen
        [HttpGet("images/{name}")]
        public IActionResult ProductImage(string name)
        {
            return File($"~/images/{name}", "image/jpg");
            //return File($"~/images/{name}", "image/jpg", "xxxx.jpg");
        }

        [HttpPost]
        public IActionResult AddProduct([FromForm] Products model, IFormFile formFile) // [FromBody] = receive data type JSON, [FromForm] = receive data type Form
        {                                                                        // formFile is a name from frontend
            try
            {
                var imageName = UploadProductImage(formFile);
                if (imageName != null)
                {
                    model.Image = imageName;
                }

                dataContext.Products.Add(model); //Temp
                dataContext.SaveChanges(); // Actual add on DB

                return Created("", model);  // Status 201 = created successfuly
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public IActionResult EditProduct(int id, [FromForm] Products product, IFormFile formFile)
        {
            try
            {
                var result = dataContext.Products.Find(id);
                if (result == null)
                {
                    return NotFound(); // not found, return 404
                }

                result.Name = product.Name;
                result.Price = product.Price;
                result.Stock = product.Stock;

                string fileName = UploadProductImage(formFile);
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
        public string UploadProductImage(IFormFile image)  // Copy image to path
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
