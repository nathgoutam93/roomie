import { AppImages } from "../assets/images";
import { AppLotties } from "../assets/lotties";
import Colors from "./Colors";

export const Scenes = [
  {
    image: AppImages.team,
    animation: AppLotties.first_bump,
    title: `Find Your Perfect Roommate`,
    description: `Discover your ideal roommate here on Roomie. Swipe, chat, and connect with compatible matches.`,
    color: "#000",
    background: Colors.light.accent,
  },
  {
    image: AppImages.team,
    animation: AppLotties.profile,
    title: "Create Your Unique Profile",
    description:
      "Build an appealing profile to attract the perfect roommate who matches your preferences and lifestyle.",
    color: "#000",
    background: Colors.light.accent,
  },
  {
    image: AppImages.community,
    animation: AppLotties.fishing,
    title: "Discover Common Interests",
    description:
      "Connect with roommates who share your interests, values, and lifestyle choices.",
    color: "#000",
    background: Colors.light.accent,
  },
  {
    image: AppImages.community,
    animation: AppLotties.people,
    title: "Chat and Get to Know Each Other",
    description: `Engage in conversations with potential roommates to ensure a harmonious living arrangement.`,
    color: "#000",
    background: Colors.light.accent,
  },
];
