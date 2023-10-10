using Microsoft.AspNetCore.Mvc;
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
    }
}
