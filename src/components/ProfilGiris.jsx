"use client"

import { useState, useRef, useCallback } from "react"
import { Pencil, X, Camera, Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { format } from 'date-fns'

import axios from "axios"

export default function ProfileGiris() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Muhammed Yusuf Akar",
    profession: "çiftçi / hayvan üreticisi",
    location: "Türkiye / Aydın / akbük",
    farmName: "Muhammed Yusuf'un çiftliği",
    confirmedSeller: true,
    confirmedSellerExpirationDate: new Date("2025-09-29"),
    profileImage: "/placeholder.svg?height=200&width=200",
    backgroundImage: "/placeholder.svg?height=300&width=1200",
    profileImageFile: null,
    backgroundImageFile: null,
    profileImagePreview: null,
    backgroundImagePreview: null
  })

  const profileImageInputRef = useRef(null)
  const backgroundImageInputRef = useRef(null)

  const handleOpenModal = () => {
    setIsModalOpen(true)
    // Reset previews when opening modal
    setProfileData(prev => ({
      ...prev,
      profileImagePreview: null,
      backgroundImagePreview: null,
      profileImageFile: null,
      backgroundImageFile: null
    }))
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setIsSaving(true);
  
      // State güncellemesi
      setProfileData(prev => ({
        ...prev,
        profileImage: profileData.profileImagePreview || prev.profileImage,
        backgroundImage: profileData.backgroundImagePreview || prev.backgroundImage
      }));
  
      // Axios ile db.json'a güncelleme isteği gönder
      const response = await axios.patch('http://localhost:3001/profile', {
        name: profileData.name,
        profession: profileData.profession,
        location: profileData.location,
        farmName: profileData.farmName,
        profileImage: profileData.profileImagePreview || profileData.profileImage,
        backgroundImage: profileData.backgroundImagePreview || profileData.backgroundImage
      });
      // Başarılı yanıt kontrolü
      if (response.status === 200) {
        setIsModalOpen(false);
        console.log("Profil güncellendi: Profil bilgileriniz başarıyla kaydedildi.");
      } else {
        throw new Error("Profil güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      console.log("Hata: Profil bilgileriniz kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          profileImageFile: file,
          profileImagePreview: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBackgroundImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          backgroundImageFile: file,
          backgroundImagePreview: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerProfileImageUpload = useCallback(() => {
    profileImageInputRef.current?.click()
  }, [])

  const triggerBackgroundImageUpload = useCallback(() => {
    backgroundImageInputRef.current?.click()
  }, [])

  return (
    <div className="max-w-[1580px] min-w-[428px] h-[306px] md:h-[380px] lg:h-[622px] mx-auto bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 font-primary">
      
      {/* Banner Image */}
      <div className="relative h-[111px] md:h-[176px] lg:h-[276px] md:w-full">
        <img src={profileData.backgroundImage} alt="Field landscape" className="w-full h-full object-cover" />

        {/* Profile Picture */}
        <div className="absolute -mt-14 ml-5 md:-bottom-16 md:left-8">
          <div className="overflow-hidden border-[3px] rounded-[15px] md:border-[5px] md:rounded-2xl md:w-[120px] md:h-[120px] md:mb-7 lg:mb-3 lg:border-[7px] lg:rounded-[30px] border-white w-[81px] h-[81px] lg:w-[189px] lg:h-[189px] relative group">
            <img
              src={profileData.profileImage}
              alt="Profile picture"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Edit Profile Button (Link Button) */}
        <div className="absolute top-28 right-6 md:top-45 md:right-10 lg:top-73 lg:right-14">
          <button
            className="flex text-sm md:text-md lg:text-lg items-center gap-1 text-[#22ff22] font-medium relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#22ff22] after:transition-all after:duration-300 hover:after:w-full"
            onClick={handleOpenModal}
          >
            Profili düzenle
            <Pencil className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
          </button>
        </div>
      </div>

      {/* Profile Info*/}
      <div className="mt-10 px-5 pb-8 lg:mt-20 flex flex-col gap-8">
        <div className="flex">
          {/* left side */}
          <div className="flex-1">
            {/* Name - profession - location */}
            <h1 className="text-base md:text-2xl lg:text-4xl font-bold lg:font-extrabold text-[#1c274c]">{profileData.name}</h1>
            <p className="text-xs mt-1 md:text-lg lg:text-2xl lg:font-medium lg:mt-2 text-[#717171]">{profileData.profession}</p>
            <p className="text-xs mt-1 md:text-[15px] lg:text-xl lg:font-light lg:mt-2 text-[#898989]">{profileData.location}</p>
          </div>

          {/* right side */}
          <div className="flex-col">
            {/* Farm Info Card */}
            <div>
              <h2 className="text-[9.2px] md:text-sm lg:text-xl border border-[#d0d0d0] rounded-[10px] font-extrabold text-[#1c274c] py-3 px-3 lg:px-6 lg:py-6 -mt-2">{profileData.farmName}</h2>
            </div>

            {/* Confirmed Seller */}
            {profileData.confirmedSeller && (
              <div className="flex items-center mt-2 gap-1 lg:gap-2">
                <p className="text-sm md:text-lg lg:text-3xl font-extrabold text-gradient bg-gradient-to-r from-[#FFE600] to-[#998A00] bg-clip-text text-transparent">imece onaylı Satıcı</p>
                <img className="lg:w-[28px] lg:h-[35px]" src="/ikon.png" alt="" />
              </div>
            )}

            {/* Confirmed Seller Expiration Date */}
            <div className="text-[10px] lg:text-base font-medium lg:ml-16 lg:mt-1 text-[#1C274C] kanit"> {format(profileData.confirmedSellerExpirationDate, 'dd/MM/yyyy')} Tarihine kadar geçerli</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 lg:gap-9 -mt-5 lg:-mt-0">
          <button
            className="bg-[#22ff22] text-white text-xs md:text-base lg:text-2xl lg:font-black w-[190px] h-[32px] md:w-[220px] md:h-[40px] lg:w-[367px] lg:h-[50px] font-bold rounded-[5px] lg:rounded-[10px] shadow-xl transition-transform hover:scale-105 active:scale-95"
            onClick={handleOpenModal}
          >
            Profili düzenle
          </button>
          <button className="bg-[#22ff22] text-white text-xs md:text-base lg:text-2xl lg:font-black w-[190px] h-[32px] md:w-[220px] md:h-[40px] lg:w-[367px] lg:h-[50px] font-bold rounded-[5px] lg:rounded-[10px] shadow-xl transition-transform hover:scale-105 active:scale-95 flex items-center justify-center relative">
            Mesaj kutun
            <span className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 bg-[#ff2311] text-white rounded-full w-6 h-6 lg:w-[37px] lg:h-[37px] flex items-center justify-center text-xs lg:text-2xl lg:text-extrabold kanit">
              13
            </span>
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-[#1c274c]">Profili düzenle</h2>
              <button onClick={handleCloseModal} className="text-[#898989] hover:text-[#1c274c]">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Profile Image Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="profileImage" className="text-[#1c274c] text-sm">
                      Profil Fotoğrafı
                    </Label>
                    <div
                      className="relative h-32 w-32 rounded-xl overflow-hidden border-2 border-dashed border-[#d0d0d0] mx-auto cursor-pointer hover:border-[#22ff22] transition-colors"
                      onClick={triggerProfileImageUpload}
                    >
                      {profileData.profileImagePreview ? (
                        <>
                          <img
                            src={profileData.profileImagePreview}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-1 right-1 bg-[#22ff22] rounded-full p-1">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                          <Camera className="w-8 h-8 text-[#898989]" />
                          <span className="text-xs text-[#898989] mt-1">Değiştir</span>
                        </div>
                      )}
                      <input
                        type="file"
                        id="profileImage"
                        ref={profileImageInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfileImageChange}
                      />
                    </div>
                  </div>

                  {/* Background Image Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="backgroundImage" className="text-[#1c274c] text-sm">
                      Arkaplan Fotoğrafı
                    </Label>
                    <div
                      className="relative h-32 w-full rounded-xl overflow-hidden border-2 border-dashed border-[#d0d0d0] cursor-pointer hover:border-[#22ff22] transition-colors"
                      onClick={triggerBackgroundImageUpload}
                    >
                      {profileData.backgroundImagePreview ? (
                        <>
                          <img
                            src={profileData.backgroundImagePreview}
                            alt="Background preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-1 right-1 bg-[#22ff22] rounded-full p-1">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                          <Upload className="w-8 h-8 text-[#898989]" />
                          <span className="text-xs text-[#898989] mt-1">Değiştir</span>
                        </div>
                      )}
                      <input
                        type="file"
                        id="backgroundImage"
                        ref={backgroundImageInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleBackgroundImageChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4"></div>

              {/* Profile Info Fields */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#1c274c] font-medium">
                  İsim Soyisim
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="border-[#d0d0d0] focus:border-[#22ff22] focus:ring-[#22ff22] rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profession" className="text-[#1c274c] font-medium">
                  Meslek
                </Label>
                <Input
                  id="profession"
                  name="profession"
                  value={profileData.profession}
                  onChange={handleChange}
                  className="border-[#d0d0d0] focus:border-[#22ff22] focus:ring-[#22ff22] rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-[#1c274c] font-medium">
                  Konum
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  className="border-[#d0d0d0] focus:border-[#22ff22] focus:ring-[#22ff22] rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmName" className="text-[#1c274c] font-medium">
                  Çiftlik İsmi
                </Label>
                <Input
                  id="farmName"
                  name="farmName"
                  value={profileData.farmName}
                  onChange={handleChange}
                  className="border-[#d0d0d0] focus:border-[#22ff22] focus:ring-[#22ff22] rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                  className="rounded-full px-6 border-[#d0d0d0] text-[#717171]"
                  disabled={isSaving}
                >
                  İptal
                </Button>
                <Button
                  type="submit"
                  className="rounded-full px-6 bg-[#22ff22] text-[#1c274c] hover:bg-[#1ddd1d]"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#1c274c]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Kaydediliyor...
                    </span>
                  ) : (
                    "Kaydet"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}