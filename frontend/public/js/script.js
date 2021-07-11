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

$('.body-container').toggleClass(localStorage.toggled);

function darkLight() {
  if (localStorage.toggled != 'dark') {
    $('.body-container').toggleClass('dark', true);
    localStorage.toggled = "dark";
     
  } else {
    $('.body-container').toggleClass('dark', false);
    localStorage.toggled = "";
  }
}
//darkmode end


//back to top scroll button

let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 350 ||
    document.documentElement.scrollTop > 350
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//back to top scroll end


//pre-loading

$(window).on("load",function() {
  // Animate loader off screen
  $(".se-pre-con").fadeOut("slow");;
});

//preloading end