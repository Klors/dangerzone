namespace DangerZone.Controllers
{
    using System.Web.Mvc;

    public class RevelationsController : Controller
    {
        //
        // GET: /Revelations/

        public ActionResult Revelations()
        {
            return View("~/Views/Revelations.cshtml");
        }

    }
}
