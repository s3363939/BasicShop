using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using BasicShop.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BasicShop.Controllers
{
    [Route("api/[controller]")]
    public class SaleController : Controller
    {
        shopContext db = new shopContext();

        [HttpGet("[action]")]
        public IQueryable<SalesJoin> GetAllSales()
        {
            try
            {
                return
                    from s in db.Sales
                    join C in db.Customer on s.CustomerId equals C.Id
                    join P in db.Product on s.ProductId equals P.Id
                    join st in db.Store on s.StoreId equals st.Id
                    select new SalesJoin()
                    {
                        Id = s.Id,
                        CustomerName = C.Name,
                        CustomerId = C.Id,
                        ProductName = P.Name,
                        ProductId = P.Id,
                        StoreName = st.Name,
                        StoreId = st.Id,
                        DateSold = s.DateSold
                    };
            }
            catch
            {
                throw;
            }
        }

        [HttpGet("[action]")]
        public IEnumerable<Sales> GetAllSalesIds()
        {
            try
            {
                return db.Sales.ToList();
            }
            catch
            {
                throw;
            }
        }

        //To create new sale record   
        [HttpPost("[action]")]
        public int AddSale(Sales sale)
        {
            try
            {
                db.Sales.Add(sale);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the details of a particluar sale    
        [HttpPut("[action]")]
        public int UpdateSale(Sales sale)
        {
            try
            {
                db.Sales.Update(sale);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular sale  
        [HttpGet("[action]")]
        public Sales GetSaleData(int id)
        {
            try
            {
                Sales sale = db.Sales.Find(id);
                return sale;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular customer   
        [HttpDelete("[action]")]
        public int DeleteSale(int id)
        {
            try
            {
                Sales sale = db.Sales.Find(id);
                db.Sales.Remove(sale);
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
