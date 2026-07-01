// components/questions/index.js
// Static dynamic import map — replaces import.meta.glob (Vite-only API)
// This is compatible with Next.js / Turbopack

const questionLoaders = {
  // biology
  "biology/chapter1":  () => import("./biology/chapter1.js"),
  "biology/chapter2":  () => import("./biology/chapter2.js"),
  "biology/chapter3":  () => import("./biology/chapter3.js"),
  "biology/chapter4":  () => import("./biology/chapter4.js"),
  "biology/chapter5":  () => import("./biology/chapter5.js"),
  "biology/chapter6":  () => import("./biology/chapter6.js"),
  "biology/chapter7":  () => import("./biology/chapter7.js"),
  "biology/chapter8":  () => import("./biology/chapter8.js"),
  "biology/chapter9":  () => import("./biology/chapter9.js"),
  "biology/chapter10": () => import("./biology/chapter10.js"),
  "biology/chapter11": () => import("./biology/chapter11.js"),
  "biology/chapter12": () => import("./biology/chapter12.js"),
  "biology/chapter13": () => import("./biology/chapter13.js"),
  "biology/chapter14": () => import("./biology/chapter14.js"),

  // chemistry
  "chemistry/chapter1":  () => import("./chemistry/chapter1.js"),
  "chemistry/chapter2":  () => import("./chemistry/chapter2.js"),
  "chemistry/chapter3":  () => import("./chemistry/chapter3.js"),
  "chemistry/chapter4":  () => import("./chemistry/chapter4.js"),
  "chemistry/chapter5":  () => import("./chemistry/chapter5.js"),
  "chemistry/chapter6":  () => import("./chemistry/chapter6.js"),
  "chemistry/chapter7":  () => import("./chemistry/chapter7.js"),
  "chemistry/chapter8":  () => import("./chemistry/chapter8.js"),
  "chemistry/chapter9":  () => import("./chemistry/chapter9.js"),
  "chemistry/chapter10": () => import("./chemistry/chapter10.js"),

  // computer
  "computer/chapter1":  () => import("./computer/chapter1.js"),
  "computer/chapter2":  () => import("./computer/chapter2.js"),
  "computer/chapter3":  () => import("./computer/chapter3.js"),
  "computer/chapter4":  () => import("./computer/chapter4.js"),
  "computer/chapter5":  () => import("./computer/chapter5.js"),
  "computer/chapter6":  () => import("./computer/chapter6.js"),
  "computer/chapter7":  () => import("./computer/chapter7.js"),
  "computer/chapter8":  () => import("./computer/chapter8.js"),
  "computer/chapter9":  () => import("./computer/chapter9.js"),
  "computer/chapter10": () => import("./computer/chapter10.js"),

  // english
  "english/chapter1":  () => import("./english/chapter1.js"),
  "english/chapter2":  () => import("./english/chapter2.js"),
  "english/chapter3":  () => import("./english/chapter3.js"),
  "english/chapter4":  () => import("./english/chapter4.js"),
  "english/chapter5":  () => import("./english/chapter5.js"),
  "english/chapter6":  () => import("./english/chapter6.js"),
  "english/chapter7":  () => import("./english/chapter7.js"),
  "english/chapter8":  () => import("./english/chapter8.js"),
  "english/chapter9":  () => import("./english/chapter9.js"),
  "english/chapter10": () => import("./english/chapter10.js"),

  // islamiat
  "islamiat/chapter1":  () => import("./islamiat/chapter1.js"),
  "islamiat/chapter2":  () => import("./islamiat/chapter2.js"),
  "islamiat/chapter3":  () => import("./islamiat/chapter3.js"),
  "islamiat/chapter4":  () => import("./islamiat/chapter4.js"),
  "islamiat/chapter5":  () => import("./islamiat/chapter5.js"),
  "islamiat/chapter6":  () => import("./islamiat/chapter6.js"),
  "islamiat/chapter7":  () => import("./islamiat/chapter7.js"),
  "islamiat/chapter8":  () => import("./islamiat/chapter8.js"),
  "islamiat/chapter9":  () => import("./islamiat/chapter9.js"),
  "islamiat/chapter10": () => import("./islamiat/chapter10.js"),

  // math
  "math/chapter1":  () => import("./math/chapter1.js"),
  "math/chapter2":  () => import("./math/chapter2.js"),
  "math/chapter3":  () => import("./math/chapter3.js"),
  "math/chapter4":  () => import("./math/chapter4.js"),
  "math/chapter5":  () => import("./math/chapter5.js"),
  "math/chapter6":  () => import("./math/chapter6.js"),
  "math/chapter7":  () => import("./math/chapter7.js"),
  "math/chapter8":  () => import("./math/chapter8.js"),
  "math/chapter9":  () => import("./math/chapter9.js"),
  "math/chapter10": () => import("./math/chapter10.js"),
  "math/chapter11": () => import("./math/chapter11.js"),
  "math/chapter12": () => import("./math/chapter12.js"),
  "math/chapter13": () => import("./math/chapter13.js"),
  "math/chapter14": () => import("./math/chapter14.js"),
  "math/chapter15": () => import("./math/chapter15.js"),

  // pakstudies
  "pakstudies/chapter1":  () => import("./pakstudies/chapter1.js"),
  "pakstudies/chapter2":  () => import("./pakstudies/chapter2.js"),
  "pakstudies/chapter3":  () => import("./pakstudies/chapter3.js"),
  "pakstudies/chapter4":  () => import("./pakstudies/chapter4.js"),
  "pakstudies/chapter5":  () => import("./pakstudies/chapter5.js"),
  "pakstudies/chapter6":  () => import("./pakstudies/chapter6.js"),
  "pakstudies/chapter7":  () => import("./pakstudies/chapter7.js"),
  "pakstudies/chapter8":  () => import("./pakstudies/chapter8.js"),
  "pakstudies/chapter9":  () => import("./pakstudies/chapter9.js"),
  "pakstudies/chapter10": () => import("./pakstudies/chapter10.js"),

  // physics
  "physics/chapter1":  () => import("./physics/chapter1.js"),
  "physics/chapter2":  () => import("./physics/chapter2.js"),
  "physics/chapter3":  () => import("./physics/chapter3.js"),
  "physics/chapter4":  () => import("./physics/chapter4.js"),
  "physics/chapter5":  () => import("./physics/chapter5.js"),
  "physics/chapter6":  () => import("./physics/chapter6.js"),
  "physics/chapter7":  () => import("./physics/chapter7.js"),
  "physics/chapter8":  () => import("./physics/chapter8.js"),
  "physics/chapter9":  () => import("./physics/chapter9.js"),
  "physics/chapter10": () => import("./physics/chapter10.js"),
  "physics/chapter11": () => import("./physics/chapter11.js"),

  // urdu
  "urdu/chapter1":  () => import("./urdu/chapter1.js"),
  "urdu/chapter2":  () => import("./urdu/chapter2.js"),
  "urdu/chapter3":  () => import("./urdu/chapter3.js"),
  "urdu/chapter4":  () => import("./urdu/chapter4.js"),
  "urdu/chapter5":  () => import("./urdu/chapter5.js"),
  "urdu/chapter6":  () => import("./urdu/chapter6.js"),
  "urdu/chapter7":  () => import("./urdu/chapter7.js"),
  "urdu/chapter8":  () => import("./urdu/chapter8.js"),
  "urdu/chapter9":  () => import("./urdu/chapter9.js"),
  "urdu/chapter10": () => import("./urdu/chapter10.js"),
};

export async function loadQuestions(subject, chapterId) {
  const key = `${subject}/${chapterId}`;
  const loader = questionLoaders[key];

  if (!loader) {
    console.error("❌ No file found for", key);
    return null;
  }

  try {
    const mod = await loader();
    return mod.default;
  } catch (err) {
    console.error("❌ Failed to load questions for", subject, chapterId, err);
    return null;
  }
}
