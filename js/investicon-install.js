var icUrl = ""; //That all are loading from localhost, but in reality we should have here our site URL

document.write("<div onclick=\"document.getElementById('ic-window').style.display='block'\" style='position: fixed;top: 100px;right: 0;width: 90px;height: 90px;z-index:9999'>");
document.write("  <a href=\"#\" onclick=\"document.getElementById('ic-window').style.display='block'; return false;\">");
document.write("    <img src=\""+icUrl+"/images/icon.png\" style='max-width:100%'>");
document.write("  </a>");
document.write("</div>");
document.write("<div id=\"ic-window\" style='display: none;position: fixed;top: 100px;right: 120px; z-index: 10000'; border: 1px solid grey;>");
document.write("  <iframe width=\"600px\" height=\"400px\" src=\""+icUrl+"/investicon.html\"></iframe>");
document.write("</div>");
