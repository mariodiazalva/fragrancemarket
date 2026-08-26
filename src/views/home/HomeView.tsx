import { Reveal } from "@/components/ui/Reveal";
import type { DemoReview, FaqItem, FragranceSet, Product } from "@/types";
import { CollectionsSection } from "@/views/home/sections/CollectionsSection";
import { DecantsGuideSection } from "@/views/home/sections/DecantsGuideSection";
import { DiscoverSection } from "@/views/home/sections/DiscoverSection";
import { FaqSection } from "@/views/home/sections/FaqSection";
import { FeaturedSection } from "@/views/home/sections/FeaturedSection";
import { HeroSection } from "@/views/home/sections/HeroSection";
import { OccasionsSection } from "@/views/home/sections/OccasionsSection";
import { ProfileSection } from "@/views/home/sections/ProfileSection";
import { RecommenderSection } from "@/views/home/sections/RecommenderSection";
import { ReviewsSection } from "@/views/home/sections/ReviewsSection";
import { SelectionSection } from "@/views/home/sections/SelectionSection";
import { SetsSection } from "@/views/home/sections/SetsSection";
import { SocialSection } from "@/views/home/sections/SocialSection";
import { TrustSection } from "@/views/home/sections/TrustSection";

type HomeViewProps = {
  featuredProducts: Product[];
  sets: FragranceSet[];
  reviews: DemoReview[];
  faqs: FaqItem[];
};

export function HomeView({
  featuredProducts,
  sets,
  reviews,
  faqs,
}: HomeViewProps) {
  return (
    <main>
      <HeroSection />
      <Reveal>
        <DiscoverSection />
      </Reveal>
      <Reveal>
        <FeaturedSection products={featuredProducts} />
      </Reveal>
      <Reveal>
        <ProfileSection />
      </Reveal>
      <Reveal>
        <DecantsGuideSection />
      </Reveal>
      <Reveal>
        <CollectionsSection />
      </Reveal>
      <Reveal>
        <SetsSection sets={sets} />
      </Reveal>
      <Reveal>
        <SelectionSection />
      </Reveal>
      <Reveal>
        <OccasionsSection />
      </Reveal>
      <Reveal>
        <RecommenderSection />
      </Reveal>
      <Reveal>
        <TrustSection />
      </Reveal>
      <Reveal>
        <SocialSection />
      </Reveal>
      <Reveal>
        <ReviewsSection reviews={reviews} />
      </Reveal>
      <Reveal>
        <FaqSection items={faqs} />
      </Reveal>
    </main>
  );
}
