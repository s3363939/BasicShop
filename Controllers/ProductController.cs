using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using BasicShop.Models;

namespace BasicShop.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        shopContext db = new shopContext();

        [HttpGet("[action]")]
        public IEnumerable<Product> GetAllProducts()
        {
            try
            {
                return db.Product.ToList();
            }
            catch
            {
                throw;
            }
        }

        //To create new product record   
        [HttpPost("[action]")]
        public int AddProduct(Product product)
        {
            try
            {
                db.Product.Add(product);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the details of a particluar product    
        [HttpPut("[action]")]
        public int UpdateProduct(Product product)
        {
            try
            {
                db.Product.Update(product);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular product  
        [HttpGet("[action]")]
        public Product GetProductData(int id)
        {
            try
            {
                Product product = db.Product.Find(id);
                return product;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular product   
        [HttpDelete("[action]")]
        public int DeleteProduct(int id)
        {
            try
            {
                Product product = db.Product.Find(id);
                db.Product.Remove(product);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
