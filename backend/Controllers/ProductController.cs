using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController] // [] is an annotations
    [Route("products")]
    public class ProductController : ControllerBase
    {
        private readonly DataContext dataContext;
        public ProductController(DataContext dataContext)  //select variabel then, press 'ctrl+.' and select initialize field from parameter
        {
            this.dataContext = dataContext;
        }

        // localhost:port/products
        [HttpGet] //Cannot duplicate
        public IActionResult GetAllProduct()
        {
            try
            {
                // return Ok(dataContext.Products.ToList());  // select * from product
                return Ok(dataContext.Products.OrderByDescending(p => p.ProductId)); // Order by ProductId
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
                if (result == null) {
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
                if (result == null) {
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
    }
}
