using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using BasicShop.Models;

namespace BasicShop.Controllers
{
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        shopContext db = new shopContext();

        [HttpGet("[action]")]
        public IEnumerable<Customer> GetAllCustomers()
        {
            try
            {
                return db.Customer.ToList();
            }
            catch
            {
                throw;
            }
        }

        //To create new customer record   
        [HttpPost("[action]")]
        public int AddCustomer(Customer customer)
        {
            try
            {
                db.Customer.Add(customer);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }


        //To Update the details of a particluar customer    
        [HttpPut("[action]")]
        public int UpdateCustomer(Customer customer)
        {
            try
            {
                db.Customer.Update(customer);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular customer  
        [HttpGet("[action]")]
        public Customer GetCustomerData(int id)
        {
            try
            {
                Customer customer = db.Customer.Find(id);
                return customer;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular customer   
        [HttpDelete("[action]")]
        public int DeleteCustomer(int id)
        {
            try
            {
                Customer customer = db.Customer.Find(id);
                db.Customer.Remove(customer);
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
