import Link from "next/link";
import {
  HomeContainer,
  HomeContent,
  HomeTitle,
  HomeSubtitle,
  HomeButton,
} from "@/styles/HomeStyles";

export default function Home() {
  return (
    <HomeContainer>
      <HomeContent>
        <HomeTitle>Simple Wallet</HomeTitle>
        <HomeSubtitle>Manage your money with ease</HomeSubtitle>
        <div>
          <Link href="/auth/signin">
            <HomeButton>Sign In</HomeButton>
          </Link>
          <Link href="/auth/signup">
            <HomeButton $secondary>Create Account</HomeButton>
          </Link>
        </div>
      </HomeContent>
    </HomeContainer>
  );
}
