using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using BasicShop.Models;

namespace BasicShop.Controllers
{
    [Route("api/[controller]")]
    public class StoreController : Controller
    {
        shopContext db = new shopContext();

        [HttpGet("[action]")]
        public IEnumerable<Store> GetAllStores()
        {
            try
            {
                return db.Store.ToList();
            }
            catch
            {
                throw;
            }
        }

        //To create new product store   
        [HttpPost("[action]")]
        public int AddStore(Store store)
        {
            try
            {
                db.Store.Add(store);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the details of a particluar store    
        [HttpPut("[action]")]
        public int UpdateStore(Store store)
        {
            try
            {
                db.Store.Update(store);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular store  
        [HttpGet("[action]")]
        public Store GetStoreData(int id)
        {
            try
            {
                Store store = db.Store.Find(id);
                return store;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular store   
        [HttpDelete("[action]")]
        public int DeleteStore(int id)
        {
            try
            {
                Store store = db.Store.Find(id);
                db.Store.Remove(store);
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
