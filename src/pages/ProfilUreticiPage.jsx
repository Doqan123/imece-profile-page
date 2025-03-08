
import AboutSection from "@/components/AboutSection.jsx";
import ProfilGiris from "../components/ProfilGiris.jsx";
import ProfileStatistics from "@/components/ProfileStatistics.jsx";
import Posts from "@/components/Posts.jsx";
import UserComments from "@/components/UserComments.jsx";

export default function ProfilUreticiPage() {


    




    return (


        <div >
            <h1 className="mb-10">NAVBAR</h1>
            <ProfilGiris />
            <ProfileStatistics />
            <AboutSection />
            <Posts />
            <UserComments />
            <p className="mt-10">Satıştaki ürünler</p>
            
            
        </div>
    );
}
