import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../apiClient";
import { useAutoSave } from "../hooks/useAutoSave";
import { SaveStatus } from "./SaveStatus";

const EMPTY_PROFILE = {
  name: "",
  gender: "other",
  description: "",
};

export const ProfileForm = () => {
  const [profile, setProfile] = useState({ ...EMPTY_PROFILE });
  const [lastSavedAt, setLastSavedAt] = useState(null);

  const onSave = async (profile) => {
    const { data } = await updateProfile(profile);

    setLastSavedAt(data.updatedAt);
  };

  const { dispatchAutoSave, triggerManualSave } = useAutoSave({
    onSave: onSave,
  });

  const handleAttributeChange = (attribute, value) => {
    const newProfile = { ...profile, [attribute]: value };

    dispatchAutoSave(newProfile);

    setProfile(newProfile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    triggerManualSave(profile);
  };

  useEffect(() => {
    getProfile().then((fetchedProfile) => {
      setProfile(fetchedProfile);
      setLastSavedAt(fetchedProfile.updatedAt);
    });
  }, []);

  return (
    <div className="card">
      <div className="card-content">
        <h1 className="title has-text-centered">Profile Form</h1>

        <form onSubmit={handleSubmit}>
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
                    value={profile.name}
                    onChange={(e) => {
                      handleAttributeChange("name", e.target.value);
                    }}
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
                    <select
                      name="profileGender"
                      id="profileGender"
                      value={profile.gender}
                      onChange={(e) => {
                        handleAttributeChange("gender", e.target.value);
                      }}
                    >
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
                value={profile.description}
                onChange={(e) => {
                  handleAttributeChange("description", e.target.value);
                }}
              />
            </div>
          </div>

          <div className="columns is-vcentered">
            <div className="column is-narrow">
              <input
                type="submit"
                value="Save Profile"
                className="button is-link"
              />
            </div>
            <div className="column is-narrow">
              <SaveStatus savedAt={lastSavedAt} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
