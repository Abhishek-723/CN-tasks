import { doc, getDoc, setDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db, storage } from "../config_db/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Details = () => {
  const [resumeData, setResumeData] = useState({
    objective: "",
    experience: "",
    education: "",
    skills: "",
  });
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    fetchResumeData();
  }, []);

  const uploadProfilePicture = async (uid) => {
    const storageRef = ref(storage, `profilePics/${uid}`);
    await uploadBytes(storageRef, profilePic);
    const url = await getDownloadURL(storageRef);
    console.log(url);
    return url;
  };

  const fetchResumeData = async () => {
    const id = localStorage.getItem("id");
    console.log(id);

    if (id) {
      const resumeDocRef = doc(db, "resumes", id);
      const docSnap = await getDoc(resumeDocRef);

      if (docSnap.exists()) {
        setResumeData(docSnap.data());
      } else {
        console.log("No resume data found for user");
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setResumeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("clicked");

    const id = localStorage.getItem("id");

    // Field validations
    if (!Object.values(resumeData).every(Boolean)) {
      toast.error("All fields are required!");
      return;
    }

    if (resumeData.objective.split(" ").length < 100) {
      toast.error("Objective should be at least 100 words");
      return;
    }

    if (id) {
      try {
        // setLoading(true);

        if (profilePic) {
          const url = await uploadProfilePicture(id);
          setProfilePic(url);
          resumeData.profilePicURL = url;
        }

        const resumeDocRef = doc(db, "resumes", id);
        await setDoc(resumeDocRef, resumeData, { merge: true });

        // setLoading(false);
        toast.success("Resume updated successfully");
      } catch (error) {
        toast.error("Error updating resume");
      }
    } else {
      toast.error("You need to be authenticated to update resume");
    }

    fetchResumeData();
  };

  return (
    <>
      <div className="profile-pic-container-upload">
        <label>
          <img
            src={
              profilePic ||
              "https://w1.pngwing.com/pngs/132/484/png-transparent-circle-silhouette-avatar-user-upload-pixel-art-user-profile-document-black.png"
            }
            alt="Upload Profile"
            className="round-pic"
          />
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="resume-input-form">
          <div className="row">
            <label>
              Objective:
              <textarea
                name="objective"
                placeholder="Objective"
                value={resumeData.objective}
                onChange={handleChange}
              ></textarea>
            </label>
            <label>
              Experience:
              <textarea
                name="experience"
                placeholder="Experience"
                value={resumeData.experience}
                onChange={handleChange}
              ></textarea>
            </label>
          </div>
          <div className="row">
            <label>
              Education:
              <textarea
                name="education"
                placeholder="Education"
                value={resumeData.education}
                onChange={handleChange}
              ></textarea>
            </label>
            <label>
              Skills:
              <textarea
                type="text"
                name="skills"
                placeholder="Skills (comma separated)"
                value={resumeData.skills}
                onChange={handleChange}
              ></textarea>
            </label>
          </div>
          <div className="submit-row">
            <input type="submit" value="Update" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Details;
