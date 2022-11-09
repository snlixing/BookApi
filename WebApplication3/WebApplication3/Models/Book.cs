using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication3.Models
{
    public class Book
    {
        public int ID { get; set; }
        [Required]

        [StringLength(50, MinimumLength = 2)]
        public string Name { get; set; }

        [Display(Name = "出版日期")]
        [DataType(DataType.Date)]

        public DateTime ReleaseDate { get; set; }
        [Range(1, 200)]

        [DataType(DataType.Currency)]
        public decimal Price { get; set; }

        public string Author { get; set; }
        [Required]

        public string Publishing { get; set; }
        [Timestamp]

        public byte[] RowVersion { get; set; }
    }
}
