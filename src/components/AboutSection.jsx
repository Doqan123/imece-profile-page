"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function AboutSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [aboutText, setAboutText] = useState(
    "Ben, Anadolu'nun bereketli topraklarında doğmuş, ömrünü bu topraklara adamış bir çiftçiyim. Yıllar önce babamın nasihatleriyle başladığım bu yolda, hem tohum ektim hem de hayatın türlü zorluklarıyla mücadele ettim. Tarla sürmekten hasat toplamaya, hayvan yetiştirmekten kışa hazırlık yapmaya kadar her işte emeğimi verdim. Bu topraklar bana hem geçimimi sağladı hem de sabrın, çalışkanlığın ne demek olduğunu öğretti. Şimdi ise, yılların birikimiyle, bilgimi ve tecrübemi sizin damağınızı şenlik ettirecek meyveler için kullanacağım.",
  )
  const [editText, setEditText] = useState(aboutText)

  const handleOpenModal = () => {
    setEditText(aboutText)
    setIsModalOpen(true)
  }

  const handleSave = () => {
    setAboutText(editText)
    setIsModalOpen(false)
  }

  return (
    <div className="max-w-[1580px] min-w-[428px]  mt-15 mx-auto bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 font-primary  p-6">
      
        <h2 className="text-[#1c274c] text-base md:text-2xl lg:text-[32px] font-extrabold lg:font-bold mb-4 ">Hakkında</h2>
        <p className="text-[#000000] mb-2 lg:mb-6 max-w-[1436px] text-sm md:text-lg lg:text-2xl font-normal montserrat ">{aboutText}</p>
        <div className="flex justify-end">
          <button onClick={handleOpenModal} className="text-[#22ff22] text-sm md:text-md lg:text-lg font-medium flex items-center hover:underline">
            Hakkında kısmını düzenle
            <svg
              xmlns="http://www.w3.org/2000/svg"                 
              className="h-4 w-4 lg:w-6 lg:h-6 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[#1c274c] text-xl">Hakkında Kısmını Düzenle</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="min-h-[200px] p-3 text-[#000000]"
              placeholder="Hakkında metninizi düzenleyin..."
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="mr-2">
              İptal
            </Button>
            <Button onClick={handleSave} className="bg-[#22ff22] text-white hover:bg-[#1ee01e]">
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

