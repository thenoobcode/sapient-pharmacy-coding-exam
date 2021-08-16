using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pharmacy.api.Models;
using pharmacy.api.Services;

namespace pharmacy.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicinesController : ControllerBase
    {
        private readonly IMedicineService _medicineService;
        public MedicinesController(IMedicineService medicineService)
        {
            _medicineService = medicineService;
        }
        // GET: api/medicines
        [HttpGet]
        public IActionResult Get()
        {
            var medicines = _medicineService.GetAllMedicines();
            if (medicines?.Count() > 0)
                return Ok(medicines);

            return NoContent();
        }

        // GET: api/medicines/<medicine-name>
        [HttpGet("{name}", Name = "Get")]
        public IActionResult Get(string name)
        {
            var medicine = _medicineService.GetMedicineDetails(name);
            if (medicine == null)
                return NotFound();

            return Ok(medicine);
        }

        // POST: api/medicines/add
        [HttpPost]
        [Route("add")]
        public IActionResult Post([FromBody] MedicineDetails medicine)
        {
            var medicineName= _medicineService.AddMedicine(medicine);
            if (string.IsNullOrEmpty(medicineName))
                return StatusCode(500);

            return CreatedAtAction("Get", new { name = medicineName });
        }

        // PUT: api/medicines/<medicine-name>
        [HttpPut("{name}")]
        public IActionResult Put(string name, [FromBody] string notes)
        {
            _medicineService.UpdateMedicineNotes(name, notes);
            return NoContent();
        }
    }
}
