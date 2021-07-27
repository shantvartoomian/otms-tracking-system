window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);
    
    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);
    
    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}
function showDiv() {
    document.getElementById('OH').style.display = "block";
 }

 function scrollToResult(){
    smoothScroll(document.getElementById('OH'));
 }

// spinner input
 $(document).ready(function() {
    $("#btnFetch").click(function() {
      // disable button
      $(this).prop("disabled", true);
      // add spinner to button
      $(this).html(
        `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`
      );
    });
});
//spinner end

//print area

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

//print area end

//darkmode

// $('.body-container').toggleClass(localStorage.toggled);

// function darkLight() {
//   if (localStorage.toggled != 'dark') {
//     $('.body-container').toggleClass('dark', true);
//     localStorage.toggled = "dark";
     
//   } else {
//     $('.body-container').toggleClass('dark', false);
//     localStorage.toggled = "";
//   }
// }
//darkmode end


//back to top scroll button

$(document).ready(function() {
  $(window).scroll(function() {
  if ($(this).scrollTop() > 300) {
  $('#toTopBtn').fadeIn();
  } else {
  $('#toTopBtn').fadeOut();
  }
  });
  
  $('#toTopBtn').click(function() {
  $("html, body").animate({
  scrollTop: 0
  }, 1000);
  return false;
  });
  });

//back to top scroll end


//pre-loading


$(window).on("load",function() {
  // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");;
});
//preloading end




// table sort---------------------------
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// end of table sort----------------------




//paralax effect on background image


// (function() {
//   // Add event listener
//   document.addEventListener("mousemove", parallax);
//   const elem = document.querySelector("#parallax");
//   // Magic happens here
//   function parallax(e) {
//       let _w = window.innerWidth/2;
//       let _h = window.innerHeight/2;
//       let _mouseX = e.clientX;
//       let _mouseY = e.clientY;
//       let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.002}%`;
//       let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.004}%`;
//       let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.012}%`;
//       let x = `${_depth3}, ${_depth2}, ${_depth1}`;
//       console.log(x);
//       elem.style.backgroundPosition = x;
//   }

// })();


//end of paralax effect on background image


//enter key for login

$('input').on('keypress', (event)=> {
  if(event.which === 13){
      $('.login-button').click();
  }
});

// end of enter key for login


//arrival notice function for print
// function loadarrivalprint() {
  // const xhttp = new XMLHttpRequest();
  // xhttp.onload = function() {
  //   document.getElementById("arrivalnotice").innerHTML = this.responseText;
  // }
  // xhttp.open("POST", "/printArrivalNotice",true,{hbl:'HL20080189'});
  // xhttp.send();
// }

//end of arrival notice function for print



//spinner for result
$(document).ready(function() {
  $("#btnFetch").click(function() {
  // disable button
  $(this).prop("disabled", true);
  // add spinner to button
  $(this).html(
  '<i class="fa fa-circle-notch fa-spin"></i> Creating The file...'
  );
  $(document.getElementsByClassName(Disabledbtn)).html(
    style="background-color:#ccc;"
  )
  });
  });

// end of spinner for result

