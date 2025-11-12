## HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>India Bistro</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main class="center">
      <h1>INDIA  BISTRO</h1>

    </main>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" integrity="sha512-NcZdtrT77bJr4STcmsGAESr06BYGE8woZdSdEgqnpyqac7sugNO+Tr4bGwGF3MsnEkGKhU2KL2xh6Ec+BqsaHA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script defer src="script.js"></script>

</body>
</html>

###js
function breakTheText() {
  var h1 = document.querySelector("h1");
  var h1Text = h1.textContent;

  var splittedText = h1Text.split("");

  var clutter = "";

  splittedText.forEach(function (elem, idx) {
    var klass = idx % 2 === 0 ? "even" : "odd";
    var content = elem === " " ? "&nbsp;" : elem;
    clutter += `<span class="${klass}">${content}</span>`;
  });

  h1.innerHTML = clutter;
}

breakTheText();

// Animate the two classes slightly differently
gsap.from("h1 span.even", {
  y: 80,
  opacity: 0,
  duration: 0.9,
  delay: 0.4,
  stagger: 0.05,
  ease: "power2.out",
});

gsap.from("h1 span.odd", {
  y: -80,
  opacity: 0,
  duration: 0.9,
  delay: 0.45,
  stagger: 0.05,
  ease: "power2.out",
});
###CSS
/* Basic page reset */
html, body {
  height: 100%;
}

body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  background-color: #fafafa;
  color: #222;
}

h1 span {
  display: inline-block;
}


h1{
    overflow: hidden;
}
h1 {
  margin: 0;
  font-size: 3rem;
  letter-spacing: 0.1em;
  text-align: center;
}


