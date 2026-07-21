// src/lib/flyToCart.js

/**
 * Animates a visual clone of a product card/image flying into the cart drawer or target icon.
 * @param {HTMLElement} sourceElement - The element clicked (card or card image)
 */
export function flyToCart(sourceElement) {
  if (!sourceElement || typeof window === "undefined") return;

  const rect = sourceElement.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  // Find target destination (Cart drawer header, Mobile FAB, or fallback top-right position)
  let targetX = window.innerWidth - 60;
  let targetY = 100;

  const drawerHeaderCartIcon = document.querySelector("[data-cart-icon]") || document.querySelector(".cart-target");
  const fabCart = document.querySelector("[data-fab-cart]");

  if (drawerHeaderCartIcon) {
    const targetRect = drawerHeaderCartIcon.getBoundingClientRect();
    targetX = targetRect.left + targetRect.width / 2;
    targetY = targetRect.top + targetRect.height / 2;
  } else if (fabCart) {
    const targetRect = fabCart.getBoundingClientRect();
    targetX = targetRect.left + targetRect.width / 2;
    targetY = targetRect.top + targetRect.height / 2;
  }

  // Find image inside source element if source element is a card container
  const imgEl = sourceElement.tagName === "IMG" ? sourceElement : sourceElement.querySelector("img");
  const flyingEl = document.createElement("img");

  if (imgEl && imgEl.src) {
    flyingEl.src = imgEl.src;
  } else {
    flyingEl.src = "/fallback-image.png";
  }

  flyingEl.style.position = "fixed";
  flyingEl.style.top = `${rect.top}px`;
  flyingEl.style.left = `${rect.left}px`;
  flyingEl.style.width = `${rect.width}px`;
  flyingEl.style.height = `${rect.height}px`;
  flyingEl.style.borderRadius = "12px";
  flyingEl.style.objectFit = "cover";
  flyingEl.style.zIndex = "9999";
  flyingEl.style.pointerEvents = "none";
  flyingEl.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.3)";

  document.body.appendChild(flyingEl);

  const deltaX = targetX - (rect.left + rect.width / 2);
  const deltaY = targetY - (rect.top + rect.height / 2);

  const animation = flyingEl.animate(
    [
      {
        transform: "translate(0, 0) scale(1) rotate(0deg)",
        opacity: 1,
      },
      {
        transform: `translate(${deltaX * 0.5}px, ${deltaY * 0.5 - 40}px) scale(0.6) rotate(-8deg)`,
        opacity: 0.85,
        offset: 0.5,
      },
      {
        transform: `translate(${deltaX}px, ${deltaY}px) scale(0.15) rotate(15deg)`,
        opacity: 0.2,
      },
    ],
    {
      duration: 600,
      easing: "cubic-bezier(0.2, 0.8, 0.25, 1)",
      fill: "forwards",
    }
  );

  animation.onfinish = () => {
    flyingEl.remove();
    // Trigger pulse animation on cart icon/drawer if present
    const targetBadge = document.querySelector("[data-cart-icon]") || fabCart;
    if (targetBadge) {
      targetBadge.classList.add("scale-125");
      setTimeout(() => targetBadge.classList.remove("scale-125"), 200);
    }
  };
}
