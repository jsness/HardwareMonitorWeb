using Microsoft.AspNetCore.Mvc;
using NessHardwareMonitorWeb.Models;
using NessHardwareMonitorWeb.Services;

namespace NessHardwareMonitorWeb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MonitorController : ControllerBase
    {
        private readonly IMonitorService _monitorService;

        public MonitorController(IMonitorService monitorService)
        {
            _monitorService = monitorService;
        }

        [HttpGet]
        [Route("GetHardware")]
        public IActionResult GetHardware() => Ok(_monitorService.GetHardware());

        [HttpPost]
        [Route("SaveSettings")]
        public IActionResult SaveSettings([FromBody] SettingsDto request)
        {
            _monitorService.SaveSettings(request);
            return Ok();
        }

        [HttpGet]
        [Route("GetSettings")]
        public IActionResult GetSettings(string userName) => Ok(_monitorService.GetSettings(userName));
    }
}
