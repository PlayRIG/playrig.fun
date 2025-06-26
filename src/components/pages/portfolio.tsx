import {Container, TextScramble} from "@components/ui";
import {useState, useRef, useEffect} from "react";
import {ArrowRight} from "lucide-react";
import gsap from "gsap";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
}

const CardList: React.FC<PortfolioItem> = (props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const marqueeAnimation = useRef<gsap.core.Tween | null>(null);

  const startMarquee = () => {
    if (marqueeRef.current) {
      const marqueeElement = marqueeRef.current;
      const textWidth = marqueeElement.scrollWidth;
      const containerWidth = marqueeElement.parentElement?.offsetWidth || 0;

      if (textWidth > containerWidth) {
        gsap.set(marqueeElement, {x: containerWidth});

        marqueeAnimation.current = gsap.to(marqueeElement, {
          x: -textWidth,
          duration: textWidth / 40,
          ease: "none",
          repeat: -1,
        });
      }
    }
  };

  const stopMarquee = () => {
    if (marqueeAnimation.current) {
      marqueeAnimation.current.kill();
      marqueeAnimation.current = null;
    }
    if (marqueeRef.current) {
      gsap.set(marqueeRef.current, {x: 0});
    }
  };

  const handleMouseEnter = () => {
    gsap.to(overlayRef.current, {
      scaleY: 1,
      duration: 0.3,
      ease: "cubic-bezier(0.75, 0, 0.09, 1)",
      transformOrigin: "center center",
    });

    gsap.fromTo(
      buttonRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        delay: 0.1,
        ease: "cubic-bezier(0.75, 0, 0.09, 1)",
      },
    );

    // Start marquee animation on hover
    startMarquee();
  };

  const handleMouseLeave = () => {
    gsap.to(overlayRef.current, {
      scaleY: 0,
      duration: 0.3,
      ease: "cubic-bezier(0.75, 0, 0.09, 1)",
      transformOrigin: "center center",
    });

    gsap.to(buttonRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.2,
      ease: "cubic-bezier(0.75, 0, 0.09, 1)",
    });

    // Stop marquee animation when leaving hover
    stopMarquee();
  };

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="portfolio-item relative overflow-hidden border-y border-white/20 py-8">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#FF2C2C]"
        style={{transform: "scaleY(0)"}}
      />

      <div className="relative z-10 flex h-full items-center justify-between px-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex-1">
            <h3 className="font-polysans text-6xl tracking-[-0.1rem] text-white">
              {String(props.id).padStart(2, "0")}. {props.title}
            </h3>
          </div>

          <div className="relative max-w-md overflow-hidden">
            <div
              ref={marqueeRef}
              className="whitespace-nowrap text-[0.85rem] font-light uppercase text-white/70">
              {props.description}
            </div>
          </div>
        </div>

        <button
          ref={buttonRef}
          className="absolute right-5 bg-black px-4 py-3 text-sm font-semibold text-white"
          style={{
            opacity: 0,
            transform: "translateY(50px)",
          }}>
          <ArrowRight size={20} color="white" />
        </button>
      </div>
    </div>
  );
};

export const Portfolio = () => {
  const [isShowingPortfolio, setIsShowingPortfolio] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "Veline",
      description:
        "VELN is minimalistic AI Framework for create your AI Agents or Assistants",
    },
    {
      id: 2,
      title: "Linkle",
      description: "Linkle is WEB3 linktree and social app. All links can be customized.",
    },
  ];

  const handleShowPortfolio = () => {
    if (
      !containerRef.current ||
      !buttonRef.current ||
      !portfolioRef.current ||
      !titleRef.current
    )
      return;

    const tl = gsap.timeline();

    tl.to(buttonRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.inOut",
    })
      .to(
        titleRef.current,
        {
          opacity: 0,
          y: -30,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.2",
      )
      .call(() => {
        setIsShowingPortfolio(true);
      })
      .set(portfolioRef.current, {
        display: "block",
      })
      .from(portfolioRef.current.querySelector(".portfolio-title"), {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "power3.out",
      })
      .from(
        portfolioRef.current.querySelectorAll(".portfolio-item"),
        {
          opacity: 0,
          y: 30,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.3",
      );
  };

  useEffect(() => {
    if (!isShowingPortfolio && titleRef.current && buttonRef.current) {
      gsap.set([titleRef.current, buttonRef.current], {opacity: 0, y: 30});

      gsap
        .timeline()
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        );
    }
  }, [isShowingPortfolio]);

  return (
    <Container className="bg-[#111111]" ref={containerRef}>
      {!isShowingPortfolio ? (
        <>
          <div className="relative" ref={titleRef}>
            <TextScramble
              text="Portfolio"
              className="mx-auto font-polysans-italic text-[7.5rem] tracking-[-0.32rem] text-white"
            />
            <p className="absolute -right-7 top-5 font-inconsolata text-xl text-white">
              02
            </p>
          </div>

          <div className="flex items-center justify-center">
            <button
              ref={buttonRef}
              onClick={handleShowPortfolio}
              style={{textDecorationThickness: "0.5px"}}
              className="font-inconsolata text-xl font-extralight text-white/80 underline transition-colors duration-300 hover:text-[#f2665f]">
              SEE ALL PORTFOLIO
            </button>
          </div>
        </>
      ) : null}

      <div
        ref={portfolioRef}
        className="w-full"
        style={{display: isShowingPortfolio ? "block" : "none"}}>
        <div className="portfolio-title px-8">
          <h2 className="mx-auto font-polysans text-[7.5rem] tracking-[-0.32rem] text-white/90">
            Our Portfolio
          </h2>
        </div>

        <div className="mt-8">
          {portfolioItems.map((item, index) => (
            <CardList key={index} {...item} />
          ))}
        </div>
      </div>
    </Container>
  );
};
