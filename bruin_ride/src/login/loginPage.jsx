import {SignInOut} from "../login/SignInOut";

const SignIn = () => {

    const handleSignIn = ({selectedUserName, selectedPassword}) => {
        SignInOut();
    }
    
    return (
        <form onSubmit={handleSignIn}>

                    <div className="phone-input-container">
                      <div className='desc'>
                      Please choose a username and password
                      </div>
                      <div className="phone-form">
                              <input
                              type="tel"
                              id="phoneNumber"
                              name="phoneNumber"
                              pattern="\([0-9]{3}\) [0-9]{3}-[0-9]{4}"
                              required
                              onInput={null}
                            />
                      </div>
                    </div>
                    <div className="button-container">
                      <button type="submit" className="submit-button">Submit</button>
                    </div>
                  </form>
    )
};