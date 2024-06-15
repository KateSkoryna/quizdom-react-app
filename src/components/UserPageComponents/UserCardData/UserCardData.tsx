import { Button, Card } from "react-bootstrap";
import { useAuth } from "../../../context/AuthContext";
import { MdOutlineAddAPhoto } from "react-icons/md";
import styles from "./UserCardData.module.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { CurrentUser } from "../../../types/types";
import { editUser } from "../../../API/api";

export const UserCardData = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState("");
  const [progressUpload, setProgressUpload] = useState(0);
  const [loading, setLoading] = useState(false);

  const { currentUser, setCurrentUser } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);

      console.log(files[0]);
    } else {
      console.log("File is too big");
    }
  };

  useEffect(() => {
    const handleUploadFile = () => {
      if (imageFile) {
        const name = (new Date().getTime() + imageFile.name).replace(/\s/g, "");
        const storageRef = ref(storage, `image/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setProgressUpload(progress); // to show progress upload

            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              //url is download url of file
              setDownloadURL(url);
              console.log(url);
            });
          }
        );
      } else {
        console.log("File not found");
      }
    };

    imageFile && handleUploadFile();
  }, [imageFile]);

  const handleSaveButton = async () => {
    setLoading(true);
    try {
      if (currentUser) {
        await editUser(currentUser?.id, "avatar", downloadURL);
        setCurrentUser((prev) => {
          return {
            ...((prev as CurrentUser) ?? {}),
            avatar: downloadURL,
          };
        });
      }
      setProgressUpload(0);
      setImageFile(undefined);
      setDownloadURL("");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const dateOfBirth = currentUser?.dateOfBirth
    .toLocaleDateString()
    .split("/")
    .join(".");

  return (
    <Card className={styles.card}>
      <Card.Body className={styles.imgChangeContainer}>
        <label className={styles.inputUpload}>
          <MdOutlineAddAPhoto className={styles.imgChgangeIcon} />
          <input
            type="file"
            onChange={(files) => handleSelectedFile(files.target.files)}
          />
        </label>
        <Card.Img
          src={downloadURL || currentUser?.avatar}
          className={styles.cardImg}
        />

        <Card.Title className={styles.cardTitle}>
          {currentUser?.name}
        </Card.Title>
        <Card.Text className={styles.cardText}>{currentUser?.email}</Card.Text>
        <Card.Text className={styles.cardText}>{dateOfBirth}</Card.Text>
        <Card.Text className={styles.cardText}>{currentUser?.gender}</Card.Text>

        <Card.Footer>
          <ProgressBar animated now={progressUpload} />
          <Button
            className="w-100 mt-3"
            disabled={progressUpload !== 0 && progressUpload < 100}
            onClick={handleSaveButton}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
