import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusinessIcon, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();

  const { user } = useUser();


  useEffect(() => {
    if(search.get('sign-in')){
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if(e.target === e.currentTarget){
      setShowSignIn(false);
      setSearch({});
    }
  }
  return (
    <div className="sticky top-0 z-20 shadow-md  backdrop-blur-lg">
      <nav className="py-4 flex justify-between items-center container">
        <Link to="/">
          {/* <img src="/logo.png" className="h-20" /> */}
          <span className="self-center text-2xl font-extrabold tracking-widest">
            <span className='bg-gradient-to-r from-[#4338ca] to-purple-500 bg-clip-text text-transparent font-mono'>PASSION</span>
            <span className='gradient-title font-mono'>TRACK</span>
        </span>
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>

          <SignedIn>
           {user?.unsafeMetadata?.role === "Recruiter" && (
            <Link to="/post-job">
              <Button variant="destructive" className="rounded-full">
                <PenBox size={20} className="mr-2" />
                Post a job
              </Button>
            </Link>
           )}
            <UserButton appearance={{
              elements:{
                avatarBox:"w-10 h-10",
              }
            }}>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={ <BriefcaseBusinessIcon size={15}/> }
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={ <Heart size={15}/> }
                  href="/saved-job"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div 
        className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-10"
        onClick={handleOverlayClick}>
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </div>
  );
};

export default Header;
