namespace DangerZone
{
    using System.Web.Optimization;

    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include("~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/tessellate-js").Include("~/Content/js/tessellate.js"));
            bundles.Add(new StyleBundle("~/bundles/tessellate-css").Include("~/Content/css/tessellate.css"));
        }
    }
}