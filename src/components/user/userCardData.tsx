import { useAuthStore } from "../../store/authStore";
import styles from "../../styles/pages/profile.module.scss";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useImageUpload } from "../../hooks/useImageUpload";
import { UserFormField } from "../forms/userFormField";
import { AvatarUpload } from "./avatarUpload";
import { UserEditActions } from "./userEditActions";
import { GENDER } from "../../types";
import { UserBirthFormField } from "./userBirthFormField";
import { UserLocationFormField } from "./userLocationFormField";
import { UserAboutFormField } from "./userAboutFormField";
import { editUser } from "../../fetchers/api";
import { Timestamp } from "firebase/firestore";
import StarComponent from "./starComponent";
import { MdCake, MdInfoOutline, MdLocationOn, MdPersonOutline, MdWc } from "react-icons/md";

interface UserFormData {
  displayName: string;
  dateOfBirth: Date;
  sex: GENDER;
  location: string;
  bio: string;
  imageFile?: File;
  photoURL: string;
}

const UserCardData = () => {
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const currentUser = useAuthStore((state) => state.currentUser);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { isDirty },
  } = useForm<UserFormData>({
    defaultValues: {
      displayName: currentUser?.displayName || "",
      dateOfBirth: currentUser?.dateOfBirth ? new Date(currentUser.dateOfBirth) : new Date(),
      sex: currentUser?.sex || GENDER.NEUTRAL,
      location: currentUser?.location || "",
      bio: currentUser?.bio || "",
      imageFile: undefined,
      photoURL: currentUser?.photoURL || "",
    },
  });

  const photoURL = watch("photoURL");
  const imageFile = watch("imageFile");

  const handleUploadComplete = useCallback(
    (url: string) => {
      setValue("photoURL", url, { shouldDirty: true });
    },
    [setValue]
  );

  const { progressUpload, resetProgress } = useImageUpload({
    imageFile,
    userId: currentUser?.id,
    onUploadComplete: handleUploadComplete,
  });

  const handleSelectedFile = (files: FileList | null) => {
    if (files && files[0].size < 10000000) {
      setValue("imageFile", files[0], { shouldDirty: true });
    }
  };

  const handleEditClick = () => {
    if (currentUser) {
      reset({
        displayName: currentUser.displayName,
        dateOfBirth: currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth) : new Date(),
        sex: currentUser.sex || GENDER.NEUTRAL,
        location: currentUser.location || "",
        bio: currentUser.bio || "",
        imageFile: undefined,
        photoURL: currentUser.photoURL || "",
      });
      setIsEditMode(true);
    }
  };

  const onSubmit = async (data: UserFormData) => {
    setLoading(true);
    try {
      if (currentUser) {
        const updates = [
          editUser(currentUser.id, "displayName", data.displayName),
          editUser(currentUser.id, "dateOfBirth", Timestamp.fromDate(data.dateOfBirth)),
          editUser(currentUser.id, "sex", data.sex),
          editUser(currentUser.id, "location", data.location),
          editUser(currentUser.id, "bio", data.bio),
        ];

        // Add photoURL update if photo was changed
        if (photoURL && photoURL !== currentUser.photoURL) {
          updates.push(editUser(currentUser.id, "photoURL", photoURL));
        }

        await Promise.all(updates);

        setCurrentUser({
          ...currentUser,
          displayName: data.displayName,
          dateOfBirth: data.dateOfBirth,
          sex: data.sex,
          location: data.location,
          bio: data.bio,
          photoURL: photoURL || currentUser.photoURL,
        });

        setIsEditMode(false);
        resetProgress();
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (currentUser) {
      reset({
        displayName: currentUser.displayName,
        dateOfBirth: currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth) : new Date(),
        sex: currentUser.sex || GENDER.NEUTRAL,
        location: currentUser.location || "",
        bio: currentUser.bio || "",
        imageFile: undefined,
        photoURL: currentUser.photoURL || "",
      });
    }
    setIsEditMode(false);
    resetProgress();
  };

  const genderOptions = [
    { value: GENDER.MALE, label: "Male" },
    { value: GENDER.FEMALE, label: "Female" },
    { value: GENDER.NEUTRAL, label: "Neutral" },
  ];

  return (
    <section className={styles.profileCard} aria-label="Your profile">
      <div className={styles.profileHeader}>
        <AvatarUpload
          avatarUrl={photoURL || currentUser?.photoURL}
          isEditMode={isEditMode}
          onFileSelect={handleSelectedFile}
        />
        <h1 className={styles.name}>{currentUser?.displayName || "Your profile"}</h1>
        <p className={styles.email}>{currentUser?.email}</p>
      </div>
      <StarComponent />
      <div className={styles.details}>
        <UserFormField
          label="Name"
          icon={<MdPersonOutline />}
          value={currentUser?.displayName}
          isEditMode={isEditMode}
          fieldName="displayName"
          fieldType="text"
          placeholder="Enter name"
          register={register}
        />

        <UserBirthFormField
          label="Date of birth"
          icon={<MdCake />}
          value={currentUser?.dateOfBirth}
          isEditMode={isEditMode}
          control={control}
          fieldName="dateOfBirth"
        />

        <UserFormField
          label="Sex"
          icon={<MdWc />}
          value={
            currentUser?.sex
              ? currentUser.sex[0].toUpperCase() + currentUser.sex.slice(1)
              : undefined
          }
          isEditMode={isEditMode}
          fieldName="sex"
          fieldType="select"
          options={genderOptions}
          register={register}
        />

        <UserLocationFormField
          label="Location"
          icon={<MdLocationOn />}
          value={currentUser?.location}
          isEditMode={isEditMode}
          control={control}
          fieldName="location"
        />

        <UserAboutFormField
          label="About me"
          icon={<MdInfoOutline />}
          value={currentUser?.bio}
          isEditMode={isEditMode}
          fieldName="bio"
          placeholder="Tell us about yourself"
          register={register}
          control={control}
        />
      </div>
      <UserEditActions
        isEditMode={isEditMode}
        loading={loading}
        isDirty={isDirty}
        progressUpload={progressUpload}
        onEdit={handleEditClick}
        onSave={handleSubmit(onSubmit)}
        onCancel={handleCancel}
      />
    </section>
  );
};

export default UserCardData;
