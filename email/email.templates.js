
// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily 
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.
module.exports = {

  confirm: id => ({
    subject: 'Confirm RostersGG Email Before Accessing App',
    html: `
      <div>
        <h1>RostersGG Email Confirmation</h1>
        <hr />

        <h3>Thank you for signing up to RostersGG, in a few short moments you will be the newest, valuable 
          member of the RostersGG community. There is no better tool to track player rosters, communicate with 
          players, and schedule matches with other teams. GLHF! <br /></h3>

        <h3>You must confirm your email before you may login to RostersGG.</h3>

        <p>Please click the link below to confirm your email and activate your account:
          <a href='${process.env.CLIENT_ORIGIN}/confirm/${id}'>Confirm Email</a>
        </p>
        <hr />

        <p>If you did not register on rosters.gg, please disregard this message. If the account is not activated, 
          it will be permanently deleted from our records in 7 days.</p>

        <p>Problems or concerns should be addressed to contact@rosters.gg.</p>
      </div>
    `,      
    text: `You must confirm your email to use RostersGG. Copy and paste this link: ${process.env.CLIENT_ORIGIN}/confirm/${id}`
  })
  
}