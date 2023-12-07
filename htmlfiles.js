function signup() {
    const signupfile = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- displays site properly based on user's device -->
    
      <link href="css/style.css" rel="stylesheet">
      <link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png">
      
      <title>Frontend Mentor | Newsletter sign-up form with success message</title>
    
    </head>
    <body>
    
      <div role="main">
        <div class="main">
          <div class="img-content">
            <div class="sign-up-img"></div>
          </div>
          <div class="sign-up-form">
            <div class="content">
              <!-- Sign-up form start -->
              <h1>Stay updated!</h1>
    
              <h4>Join 60,000+ product managers receiving monthly updates on:</h4>
    
              <div class="content-info"> 
                <div class="content-list">
                  <img src="/assets/images/icon-list.svg" alt="List Icon">
                  <h4> Product discovery and building what matters</h4>
                </div>   
                <div class="content-list">
                  <img src="/assets/images/icon-list.svg" alt="List Icon">
                  <h4> Measuring to ensure updates are a success</h4>
                </div>
                <div class="content-list">
                  <img src="/assets/images/icon-list.svg" alt="List Icon">    
                  <h4> And much more!</h4>
                </div>
              </div>
    
              <form class="sign-up-Form" id="form" action="/submit" method="POST" enctype="multipart/form-data">
                <div class="form-content">
                  <div class="label">
                    <div class="eml">Email address</div> 
                    <div class="erro-r">Valid email required</div>
                  </div><br>
                  <input type="email" class="email sme" id="email" placeholder="email@company.com" required>
                </div>
                <div>
                  <div class="button sme">Subscribe to monthly newsletter</div>
                </div>
              </form>
              <!-- Sign-up form end -->
            </div>
          </div>
        </div>
      </div>
      <div class="attribution" role="contentinfo">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="https://www.ayocodex.site">Ayomide Ojutalayo</a>.
      </div>
    </body>
    <script src="js/script.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="app.js"></script>
    </html>
    `
    return signupfile;
}

// Path: Newsletter-sign-up/public/js/htmlfiles.js

function successmsg(email) {
    const successfile = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- displays site properly based on user's device -->
    
      <link href="css/style.css" rel="stylesheet">
      <link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png">
      
      <title>Frontend Mentor | Newsletter sign-up form with success message</title>
    
    </head>
    <body>
    
      <div role="main">
        <!-- Success message start -->
        <div class="success-message" data-wow-delay="0.1s" style=" display: block;">
          <div class="divv">
          <div class="success-message-content">
            <img alt="An Icon Succes Image" src="/assets/images/icon-success.svg">
            <h1>Thanks for subscribing!</h1>
            <h4>A confirmation email has been sent to <b>${email}</b>. 
              Please open it and click the div inside to confirm your subscription.</h4>
          </div>
          <div class="success-message-dismiss">
            <div class="button sme">Dismiss message</div>
          </div>
          </div>
          <!-- Pre Loader -->
            <div id="loader" class="show">
                <div class="loader"></div>
            </div>
        </div>
        <!-- Success message end -->
      </div>
      <div class="attribution" role="contentinfo">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
        Coded by <a href="https://www.ayocodex.site">Ayomide Ojutalayo</a>.
      </div>
    </body>
    <script src="js/script2.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="app.js"></script>
    </html>
    `;
    return successfile;
}

module.exports = {
  signup,
  successmsg
};