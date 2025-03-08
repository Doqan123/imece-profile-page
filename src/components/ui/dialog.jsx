// React ve gerekli bağımlılıkları içe aktarıyoruz.
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog"; // Radix UI'nin Dialog bileşenini kullanıyoruz.
import { XIcon } from "lucide-react"; // Lucide React kütüphanesinden kapatma ikonu içe aktarılıyor.

import { cn } from "@/lib/utils"; // CSS sınıflarını birleştiren yardımcı fonksiyon.

// `Dialog` bileşeni, Radix UI'nin `DialogPrimitive.Root` bileşeninin bir sarmalayıcısıdır.
function Dialog({
  ...props
}) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

// `DialogTrigger` bileşeni, diyalog açma butonu olarak kullanılacak bileşen.
function DialogTrigger({
  ...props
}) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

// `DialogPortal` bileşeni, diyalog penceresinin DOM içinde başka bir yere taşınmasını sağlar.
function DialogPortal({
  ...props
}) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

// `DialogClose` bileşeni, diyalog penceresini kapatmak için kullanılan buton.
function DialogClose({
  ...props
}) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

// `DialogOverlay`, diyalog açıldığında arkada beliren bulanık katmanı (overlay) oluşturur.
function DialogOverlay({
  className,
  ...props
}) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
        className
      )}
      {...props} />
  );
}

// `DialogContent`, diyalog içeriğini kapsayan ana bileşendir.
function DialogContent({
  className,
  children,
  ...props
}) {
  return (
    // Diyalog içeriğini `DialogPortal` içine yerleştiriyoruz.
    <DialogPortal data-slot="dialog-portal">
      {/* Arka plan katmanı (overlay) */}
      <DialogOverlay />
      {/* Diyalog içeriği */}
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}>
        {children} {/* Diyalog içeriği buraya yerleştirilecek. */}

        {/* Kapatma butonu */}
        <DialogPrimitive.Close
          className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon /> {/* Kapatma butonu için X ikonunu gösteriyoruz */}
          <span className="sr-only">Close</span> {/* Erişilebilirlik için gizli "Close" metni */}
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

// `DialogHeader`, diyalog içindeki başlık bölümünü oluşturur.
function DialogHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props} />
  );
}

// `DialogFooter`, diyalog içindeki alt kısmı (örneğin butonları) düzenler.
function DialogFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props} />
  );
}

// `DialogTitle`, diyalog başlığını temsil eden bileşendir.
function DialogTitle({
  className,
  ...props
}) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props} />
  );
}

// `DialogDescription`, diyalog açıklama metnini temsil eden bileşendir.
function DialogDescription({
  className,
  ...props
}) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props} />
  );
}

// Tüm bileşenleri dışa aktarıyoruz, böylece başka dosyalarda kullanılabilirler.
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
