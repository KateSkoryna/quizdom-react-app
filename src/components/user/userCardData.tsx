import { Button, Card } from "react-bootstrap";
import { useAuthStore } from "../../store/AuthStore";
import styles from "../../styles/pages/user.module.scss";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { editUser } from "../../API/api";
import { useForm } from "react-hook-form";

interface UserFormData {
  name: string;
  dateOfBirth: string;
  gender: string;
  location: string;
  imageFile?: File;
  downloadURL: string;
}

const UserCardData = () => {
  const [progressUpload, setProgressUpload] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const currentUser = useAuthStore((state) => state.currentUser);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const { register, handleSubmit, reset, watch, setValue, formState: { isDirty } } = useForm<UserFormData>({
    defaultValues: {
      name: currentUser?.name || "",
      dateOfBirth: currentUser?.dateOfBirth ? new Date(currentUser.dateOfBirth).toISOString().split('T')[0] : "",
      gender: currentUser?.gender || "",
      location: currentUser?.location || "",
      imageFile: undefined,
      downloadURL: currentUser?.avatar || "",
    }
  });

  const downloadURL = watch("downloadURL");
  const imageFile = watch("imageFile");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 10000000) {
      setValue("imageFile", files[0], { shouldDirty: true });
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
            setProgressUpload(progress); // to show progress upload
          },
          () => {
            // Handle error silently
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              //url is download url of file
              setValue("downloadURL", url, { shouldDirty: true });
            });
          }
        );
      }
    };

    imageFile && handleUploadFile();
  }, [imageFile]);


  const handleEditClick = () => {
    if (currentUser) {
      reset({
        name: currentUser.name,
        dateOfBirth: currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth).toISOString().split('T')[0] : "",
        gender: currentUser.gender,
        location: currentUser.location || "",
        imageFile: undefined,
        downloadURL: currentUser.avatar || "",
      });
      setIsEditMode(true);
    }
  };

  const onSubmit = async (data: UserFormData) => {
    setLoading(true);
    try {
      if (currentUser) {
        const newDate = new Date(data.dateOfBirth);

        const updates = [
          editUser(currentUser.id, "name", data.name),
          editUser(currentUser.id, "dateOfBirth", newDate.toISOString()),
          editUser(currentUser.id, "gender", data.gender),
          editUser(currentUser.id, "location", data.location),
        ];

        // Add avatar update if photo was changed
        if (downloadURL && downloadURL !== currentUser.avatar) {
          updates.push(editUser(currentUser.id, "avatar", downloadURL));
        }

        await Promise.all(updates);

        setCurrentUser({
          ...currentUser,
          name: data.name,
          dateOfBirth: newDate,
          gender: data.gender as "male" | "female",
          location: data.location,
          avatar: downloadURL || currentUser.avatar,
        });

        setIsEditMode(false);
        setProgressUpload(0);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (currentUser) {
      reset({
        name: currentUser.name,
        dateOfBirth: currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth).toISOString().split('T')[0] : "",
        gender: currentUser.gender,
        location: currentUser.location || "",
        imageFile: undefined,
        downloadURL: currentUser.avatar || "",
      });
    }
    setIsEditMode(false);
    setProgressUpload(0);
  };

  const dateOfBirth = currentUser?.dateOfBirth
    .toLocaleDateString()
    .split("/")
    .join(".");

  return (
    <Card className={`${styles.card} border h-100`}>
      <Card.Body className={`${styles.userCardContainer} d-flex flex-column`}>
        <div className={styles.userImage}>
          {isEditMode && (
            <label className={styles.inputUpload}>
              <input
                type="file"
                onChange={(files) => handleSelectedFile(files.target.files)}
                aria-label="Upload profile photo"
              />
            </label>
          )}
          <Card.Img
            src={downloadURL || currentUser?.avatar}
            className={styles.cardImg}
          />
        </div>
        <div className="flex-grow-1">
          {/* Name Field */}
          <Card.Text className={`${styles.cardText} d-flex justify-content-between align-items-center`}>
            <strong>Name:</strong>
            <span>
              {isEditMode ? (
                <input
                  type="text"
                  className="form-control form-control-sm"
                  {...register("name")}
                  placeholder="Enter name"
                />
              ) : (
                currentUser?.name
              )}
            </span>
          </Card.Text>

          {/* Email Field (non-editable) */}
          <Card.Text className={`${styles.cardText} d-flex justify-content-between align-items-center`}>
            <strong>Email:</strong>
            <span>{currentUser?.email}</span>
          </Card.Text>

          {/* Date of Birth Field */}
          <Card.Text className={`${styles.cardText} d-flex justify-content-between align-items-center`}>
            <strong>Date of Birth:</strong>
            <span>
              {isEditMode ? (
                <input
                  type="date"
                  className="form-control form-control-sm"
                  {...register("dateOfBirth")}
                />
              ) : (
                dateOfBirth
              )}
            </span>
          </Card.Text>

          {/* Gender Field */}
          <Card.Text className={`${styles.cardText} d-flex justify-content-between align-items-center`}>
            <strong>Sex:</strong>
            <span>
              {isEditMode ? (
                <select
                  className="form-select form-select-sm"
                  {...register("gender")}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              ) : (
                currentUser?.gender
              )}
            </span>
          </Card.Text>

          {/* Location Field */}
          <Card.Text className={`${styles.cardText} d-flex justify-content-between align-items-center`}>
            <strong>Location:</strong>
            <span>
              {isEditMode ? (
                <input
                  type="text"
                  className="form-control form-control-sm"
                  {...register("location")}
                  placeholder="Enter location"
                />
              ) : (
                currentUser?.location || "Not set"
              )}
            </span>
          </Card.Text>
        </div>
        <Card.Footer className="mt-auto" style={{ backgroundColor: 'transparent' }}>
          <div className="mb-2" style={{ minHeight: '1.5rem' }}>
            <ProgressBar
              animated={progressUpload > 0 && progressUpload < 100}
              now={progressUpload}
              variant={progressUpload > 0 ? "primary" : "secondary"}
              label={progressUpload > 0 ? `${Math.round(progressUpload)}%` : ""}
            />
          </div>
          {isEditMode ? (
            <div className="d-flex gap-2">
              <Button
                className="flex-grow-1"
                onClick={handleSubmit(onSubmit)}
                disabled={loading || !isDirty}
              >
                {loading ? "Saving..." : "Save Profile"}
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              className="w-100"
              onClick={handleEditClick}
              variant="outline-primary"
            >
              Edit Profile
            </Button>
          )}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default UserCardData;
