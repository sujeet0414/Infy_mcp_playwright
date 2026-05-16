module.exports = class Admin_Publisher_DSP {

    PasswordTextField = '//input[@name="password"]';
    EmailError = '//label[contains(text(),"Enter your email")]';
    InfyTvLogo = '//img[@alt="infy-tv-logo"]';
    DontHaveAnAccountText = '//div[@class="d-flex align-items-center"]//p';
    CreateAccountButton = '//button[contains(text(),"Create Account")]';
    LoginToInfyTitleOnEmailPage = '//h3[@class="fw-light"]';
    LoginToInfyTitleOnPasswordPage = '//h3[@style="font-weight: 300;"]';
    EmailTextField = "//input[@name='email']";
    TextOnLoginEmailPage = '//h3[@class="fw-light"]//parent::div//p[1]';
    EmailLabel = '//div[@style="margin-bottom: 16px;"]//label';
    LoginButton = '//button[contains(text(),"Login")] | //div//button[@class="button button-full button-primary undefined"]';
    ErrorOfValidEmail = '//label[contains(text(),"Enter valid email")]';
    Image = '//div[@class="login__wrap__right"]';
    PasswordLabel = '//div[@style="margin-bottom: 16px;"]//label';
    ForgotPasswordLink = '//a[@href="/forgot-password"]';
    PassWordError = '//label[contains(text(),"Enter your Password")]';
    SendRecoveryLinkButton = '//button[contains(text(),"Send Recovery Link")]';
    TitleRecoveryEmailSent = '//h3[contains(text(),"Recovery Email Sent")]';
    SendAgainLink = '//button[contains(text(),"Send Again")]';
    DidntGetTheEmail = '//p[@style="text-align: center;" and contains(text()," get the Email?")]'
    GettingEmailInMailinator = '//table[@class="table-striped jambo_table"]//tr[1][./td[contains(text(),"Password Recovery")]]';
    NewPassword = '//input[@placeholder="Enter New Password"]';
    ConfirmPassword = '//input[@placeholder="Re-Enter new password"]';
    ResetPasswordButton = '//button[@class="button button-full button-primary"]';
    LoginButtonAfterResetPassword = '//button[contains(text(),"Login")]';
    ProfileNameOfResetPasswordAccount = '//div[@class="col header__right__menu__name"]';
    ProfileImgOfResetPasswordAccount = '//div[@class="col header__right__menu__img"]';
    TitleOfForgotPasswordPage = '//h3[contains(text(),"Forgot Password")]';
    EmailBoxOnForgotPassword = '//input[@placeholder="Enter your Email"]';
    YopmailBox = '//input[@placeholder="Enter your inbox here"]'; 
    ArrowButton = '//button[@title="Check Inbox @yopmail.com"]';
    ResetYourPasswordButton = '//a[contains(text(),"Reset Your Password")]';
    IFrame = '//iframe[@id="ifmail"]';
    LinkForForgotPassword = '//a[contains(text(),"Reset Your Password")]//parent::td//a[2]';
    Password_changed_msg = "//td//h3";
    LoginLinkInMail = "(//td//a)[2]";
    LoginButtonInMail = "(//td//a)[1]";
    TitlePasswordResetSuccessfully = '//h3[@style="font-weight: 300; text-align: center;" and contains(text(),"Password Create Successfully")]';
    TextOnPasswordPage = '//div[@class="card-box"]//p';
    PasswordText = '//input[@name="password" and @type="text"]';
    PasswordPassword = '//input[@name="password" and @type="password"]';
    EyeIcon = '//input[@name="password"]//parent::div//*[@class="svg-icon"]';
    ProfileName = '//button[@class="button button-secondary d-flex justify-content-end align-items-center dropdown-toggle btn btn-primary"]';
    ProfileImage = '//button[@class="button button-secondary d-flex justify-content-end align-items-center dropdown-toggle btn btn-primary"]//img';
    WrongPasswordToaster = '//div[@class="Toastify__toast Toastify__toast-theme--light Toastify__toast--error"]';
    User_already_exists_Toaster= '//p[@class="mt-3 p-2"]';
    Label_Dont_Have_An_Account = '//div[@class="d-flex align-items-center"]//p';
    Dropdown_Of_Average_Monthly_Traffic = '//label[contains(text(),"Average Monthly Traffic")]//parent::div//div[@class=" css-b62m3t-container"]';
    Dropdown_Of_Countries = '//label[contains(text(),"Countries")]//parent::div//div[@class=" css-b62m3t-container"]';
    Dropdown_Of_States = '//label[contains(text(),"States")]//parent::div//div[@class=" css-b62m3t-container"]';
    Dropdown_Of_Cities = '//label[contains(text(),"Cities")]//parent::div//div[@class=" css-b62m3t-container"]';
    Traffic_100K = '//div[@class="select__menu-list css-11unzgr"]//div[contains(text(),"100K")]'
    Traffic_500K = '//div[@class="select__menu-list css-11unzgr"]//div[contains(text(),"500K")]'
    Traffic_1M = '//div[@class="select__menu-list css-11unzgr"]//div[contains(text(),"1M")]'
    Traffic_2MPlus = '//div[@class="select__menu-list css-11unzgr"]//div[contains(text(),"2M+")]';
    Country_Afghanistan = '//div[contains(text(),"Afghanistan")]';
    Country_Aland_Island = '//div[contains(text(),"Aland Islands")]';
    State_Badakhshan = '//div[contains(text(),"Badakhshan")]';
    State_Badgis = '//div[contains(text(),"Badghis")]';
    City_Fayzabad = '//div[contains(text(),"Fayzabad")]';
    Selected_Countries_Name = '//label[contains(text(),"Countries")]//parent::div//div[@class="select__single-value css-qc6sy-singleValue"]'
    Selected_States_Name = '//label[contains(text(),"States")]//parent::div//div[@class="select__single-value css-qc6sy-singleValue"]'
    Selected_Cities_Name = '//label[contains(text(),"Cities")]//parent::div//div[@class="select__single-value css-qc6sy-singleValue"]'
    TextOnEmailFieldPage = '//div[@class="login__wrap__left__box card-box"]//p';
    EnteredPublisherEmail = '//input[@placeholder="Enter your Email"]';
    CreateAccountButton = '//button[contains(text(),"Create Account")]';
    Title_ = '//div[@class="login__wrap__left__box card-box"]//h3';
    Join_US_Title = '//h3[@class="signup__wrap__left__box__padding"]'
    Description = '//div[@class="signup__wrap__left__box card-box"]//p[1]';
    JoinTheTeamTitle = '//h3[contains(text(),"Join Us")]';
    TestDemoQA = '//p[contains(text(),"okgo")]';
    CancelButton = '//a//span[contains(text(),"Cancel")]';
    NextButton = '//button[@type="submit" and contains(text(),"Next")]';
    WeAreGettingTitle = '//div[@class="card-box"]//h3';
    CompanyNameError = '//label[contains(text(),"Enter your company Name")]';
    NameError = '//label[contains(text(),"Enter your Name")]';
    PublisherNameError = '//label[contains(text(),"Enter your Publisher Name")]';
    WebsiteURLError = '//label[contains(text(),"Enter a valid URL")]';
    PrivacyPolicy = '//p[contains(text(),"Privacy Policy")]';
    TermsAndConditions = '//p[contains(text(),"Terms and Conditions")]';
    CompanyNameTextField = '//input[@name="companyName"]';
    NameTextField = '//input[@name="name"]';
    PublisherNameTextField = '//input[@name="publisherName"]';
    Traffic_Dropdown = '(//div[@class=" css-xof5di-control"])[1]';
    Countries_Dropdown = '(//div[@class=" css-xof5di-control"])[2]';
    States_Dropdown = '(//div[@class=" css-xof5di-control"])[3]';
    Cities_Dropdown = '(//div[@class=" css-xof5di-control"])[4]';
    WebsiteUrlTextField = '//input[@name="websiteUrl"]';
    Pending_Status = '//div[@class="card card-selected"]//label[contains(text(),"Pending")]'
    Official_Email_Id_On_Approval_Form = '//label[contains(text(),"Official Email")]//parent::div//p'
    TitleLetsTakeATour = '//div[@class="modal-content"]//h2';
    Input_RTB_End_Point = "//input[@placeholder='Enter RTB Endpoint URL']";
    Close_Button_on_Modal = '(//div[@class="modal-content"]//button[contains(text(),"Close")])[1]';
    Disabled_Test_Integration_button = '//button[@class="button button-large button-primary float-end button-disabled"]';
    Enabled_Test_Integration_button = '(//button[@class="button button-large button-primary float-end"])[1]';
    ErrorToaster = '//div[@class="Toastify__toast Toastify__toast-theme--light Toastify__toast--error"]';
    SuccessToaster = '//div[@class="Toastify__toast Toastify__toast-theme--light Toastify__toast--success"]';
    Profile_Box = '//img[@class="rounded-circle ms-2"]/parent::button';
    Welcome_MSG = '//div[@class="intercom-1hu6sk e141za3z4"]';
    Clear_Button = '//button[contains(text(),"Clear")]';
    NextButtonOnModal = '//div[@class="modal-content"]//button[contains(text(),"Next")]';
    DoneButtonOfModal = '//div[@class="modal-content"]//button[contains(text(),"Done")]';
    FloaterBody = '//div[@class="__floater__body"]';
    TitleOfFloater = '//DIV[@class="__floater__body"]//div//p[1]';
    DescriptionOfFloater = '//DIV[@class="__floater__body"]//div//p[2]';
    NextButtonOnFloater = '//DIV[@class="__floater__body"]//button[contains(text(),"Next")]';
    LetsGoButton = "//button[@class='button button-primary undefined' and contains(text(),\"Let's Go\")]";
    Company_Name_In_Customer_Details = '//label[contains(text(),"Company Name")]//parent::div//p';
    Name_In_Customer_Details = '(//label[contains(text(),"Name")]//parent::div//p)[2]';
    Name_Of_Publisher_In_Customer_Details = '//label[contains(text(),"Name of")]//parent::div//p';
    Website_URL_In_Customer_Details = '//label[contains(text(),"Website URL")]//parent::div//p';
    Approve_Button = '//button[@class="button button-primary undefined" and contains(text(),"Approve")]';
    Title_Of_Company_Name = '//div[@class="mt-3 d-flex"]//h2';
  
  }
  