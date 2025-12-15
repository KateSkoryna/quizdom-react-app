import { Card } from "react-bootstrap";
import { useAuthStore } from "../../store/AuthStore";
import styles from "../../styles/pages/user.module.scss";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useImageUpload } from "../../hooks/useImageUpload";
import { UserFormField } from "./userFormField";
import { AvatarUpload } from "./avatarUpload";
import { UserEditActions } from "./userEditActions";
import { GENDER } from "../../../shared/src/types";
import { UserBirthFormField } from "./userBirthFormField";
import { UserLocationFormField } from "./userLocationFormField";
import { UserAboutFormField } from "./userAboutFormField";
import { editUser } from "../../fetchers/api";
import { Timestamp } from "firebase/firestore";
import StarComponent from "./starComponent";

interface UserFormData {
  name: string;
  dateOfBirth: Date;
  gender: string;
  location: string;
  userInfo: string;
  imageFile?: File;
  downloadURL: string;
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
      name: currentUser?.name || "",
      dateOfBirth: currentUser?.dateOfBirth ? new Date(currentUser.dateOfBirth) : new Date(),
      gender: currentUser?.gender || "",
      location: currentUser?.location || "",
      userInfo: currentUser?.userInfo || "",
      imageFile: undefined,
      downloadURL: currentUser?.avatar || "",
    },
  });

  const downloadURL = watch("downloadURL");
  const imageFile = watch("imageFile");

  const handleUploadComplete = useCallback(
    (url: string) => {
      setValue("downloadURL", url, { shouldDirty: true });
    },
    [setValue]
  );

  const { progressUpload, resetProgress } = useImageUpload({
    imageFile,
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
        name: currentUser.name,
        dateOfBirth: currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth) : new Date(),
        gender: currentUser.gender,
        location: currentUser.location || "",
        userInfo: currentUser.userInfo || "",
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
        const updates = [
          editUser(currentUser.id, "name", data.name),
          editUser(currentUser.id, "dateOfBirth", Timestamp.fromDate(data.dateOfBirth)),
          editUser(currentUser.id, "gender", data.gender),
          editUser(currentUser.id, "location", data.location),
          editUser(currentUser.id, "userInfo", data.userInfo),
        ];

        // Add avatar update if photo was changed
        if (downloadURL && downloadURL !== currentUser.avatar) {
          updates.push(editUser(currentUser.id, "avatar", downloadURL));
        }

        await Promise.all(updates);

        setCurrentUser({
          ...currentUser,
          name: data.name,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender as GENDER,
          location: data.location,
          userInfo: data.userInfo,
          avatar: downloadURL || currentUser.avatar,
        });

        setIsEditMode(false);
        resetProgress();
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
        dateOfBirth: currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth) : new Date(),
        gender: currentUser.gender,
        location: currentUser.location || "",
        userInfo: currentUser.userInfo || "",
        imageFile: undefined,
        downloadURL: currentUser.avatar || "",
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
    <Card className={`${styles.card} d-flex flex-column border h-100`}>
      <AvatarUpload
        avatarUrl={downloadURL || currentUser?.avatar}
        isEditMode={isEditMode}
        onFileSelect={handleSelectedFile}
      />
      <div>
        <UserFormField
          label="Email"
          value={currentUser?.email}
          isEditMode={false}
          fieldName="email"
        />
        <UserFormField
          label="Name"
          value={currentUser?.name}
          isEditMode={isEditMode}
          fieldName="name"
          fieldType="text"
          placeholder="Enter name"
          register={register}
        />

        <UserBirthFormField
          label="Date of Birth"
          value={currentUser?.dateOfBirth}
          isEditMode={isEditMode}
          control={control}
          fieldName="dateOfBirth"
        />

        <UserFormField
          label="Sex"
          value={currentUser?.gender}
          isEditMode={isEditMode}
          fieldName="gender"
          fieldType="select"
          options={genderOptions}
          register={register}
        />

        <UserLocationFormField
          label="Location"
          value={currentUser?.location}
          isEditMode={isEditMode}
          control={control}
          fieldName="location"
        />

        <UserAboutFormField
          label="About me"
          value={currentUser?.userInfo}
          isEditMode={isEditMode}
          fieldName="userInfo"
          placeholder="Tell us about yourself"
          register={register}
        />
      </div>
      <div className="pt-3">
        <StarComponent />
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
    </Card>
  );
};

export default UserCardData;
