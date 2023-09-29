export const ProfileForm = () => {
  return (
    <div className="card">
      <div className="card-content">
        <h1 className="title has-text-centered">Profile Form</h1>

        <form>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label" htmlFor="profileName">
                  Name
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="profileName"
                    id="profileName"
                  />
                </div>
              </div>
            </div>

            <div className="column">
              <div className="field">
                <label className="label" htmlFor="profileGender">
                  Gender
                </label>
                <div className="control">
                  <div className="select">
                    <select name="profileGender" id="profileGender">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label className="label" htmlFor="profileDescription">
                About Me
              </label>
              <textarea
                className="textarea"
                name="profileDescription"
                id="profileDescription"
              />
            </div>
          </div>

          <input
            type="submit"
            value="Save Profile"
            className="button is-link"
          />
        </form>
      </div>
    </div>
  );
};
