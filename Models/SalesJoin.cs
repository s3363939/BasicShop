using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BasicShop.Models
{
    public partial class SalesJoin
    {
        public int Id { get; set; }
        public String CustomerName { get; set; }
        public int CustomerId { get; set; }
        public String ProductName { get; set; }
        public int ProductId { get; set; }
        public String StoreName { get; set; }
        public int StoreId { get; set; }
        public DateTime? DateSold { get; set; }
    }
}
