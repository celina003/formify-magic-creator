import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import FormSection from "./FormSection";
import CheckboxOption from "./CheckboxOption";
import RatingScale from "./RatingScale";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export type FormDataType = {
  expectations: string[];
  interests: string[];
  lifeScores: {
    leisure: number | null;
    work: number | null;
  };
  hobbies: string[];
  importantRelationshipTraits: string[];
  timeTogether: number | null;
  personalityType: string;
  futureOutlook: string[];
  emotionalSupport: number | null;
  financialGoals: number | null;
  communicationTendency: number | null;
  conflictResolution: number | null;
  familyImportance: string[];
  houseworkSplit: number | null;
  childrenDesire: string;
  futureMoves: string[];
  religionImportance: number | null;
  politicalViews: number | null;
  moneyHandling: string[];
  trustIssues: string[];
  socialLife: number | null;
  friendsTime: number | null;
  healthImportance: number | null;
  pets: string;
  sexualCompatibility: number | null;
  acceptanceNeeds: string[];
  incomeRequirements: string;
  selfDescription: string;
  idealPartner: string;
  email: string;
  age: string;
  stressResponse: string[];
  lifePriorities: string[];
  overallRating: number | null;
  gender: string;
  name: string;
};

export function CompatibilityForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataType>({
    expectations: [],
    interests: [],
    lifeScores: {
      leisure: null,
      work: null,
    },
    hobbies: [],
    importantRelationshipTraits: [],
    timeTogether: null,
    personalityType: "",
    futureOutlook: [],
    emotionalSupport: null,
    financialGoals: null,
    communicationTendency: null,
    conflictResolution: null,
    familyImportance: [],
    houseworkSplit: null,
    childrenDesire: "",
    futureMoves: [],
    religionImportance: null,
    politicalViews: null,
    moneyHandling: [],
    trustIssues: [],
    socialLife: null,
    friendsTime: null,
    healthImportance: null,
    pets: "",
    sexualCompatibility: null,
    acceptanceNeeds: [],
    incomeRequirements: "",
    selfDescription: "",
    idealPartner: "",
    email: "",
    age: "",
    stressResponse: [],
    lifePriorities: [],
    overallRating: null,
    gender: "",
    name: "",
  });

  const handleCheckboxChange = (section: string, value: string) => {
    setFormData((prev) => {
      const currentValues = prev[section as keyof typeof prev];
      
      if (Array.isArray(currentValues)) {
        if (currentValues.includes(value)) {
          return {
            ...prev,
            [section]: currentValues.filter((item) => item !== value),
          };
        } else {
          return {
            ...prev,
            [section]: [...currentValues, value],
          };
        }
      }
      
      return prev;
    });
  };

  const handleRatingChange = (section: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  const handleNestedRatingChange = (parent: string, field: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleRadioChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    sessionStorage.setItem("formData", JSON.stringify(formData));
    
    toast({
      title: "Formular gesendet",
      description: "Vielen Dank für das Ausfüllen des Zukunfts-Partner-Checks!",
    });
    
    navigate("/results");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-16">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">Zukunfts-Partner-Check: Wie kompatibel sind wir?</h1>
        <p className="text-gray-600 mb-6 text-sm">
          Bestimmen Sie Ihre wichtigsten Werte in der Partnerschaft und finden Sie heraus, wie gut Sie mit Ihrem Partner harmonieren.
        </p>

        <FormSection title="Was erwarten Sie von Ihrer nächsten Beziehung?" required>
          <CheckboxOption
            id="expectations-1"
            label="Zusammenleben, aber getrennte Finanzen"
            checked={formData.expectations.includes("separate-finances")}
            onChange={() => handleCheckboxChange("expectations", "separate-finances")}
          />
          <CheckboxOption
            id="expectations-2"
            label="Ehe oder eheähnliche Gemeinschaft"
            checked={formData.expectations.includes("marriage")}
            onChange={() => handleCheckboxChange("expectations", "marriage")}
          />
          <CheckboxOption
            id="expectations-3"
            label="Langfristig mit Kindern"
            checked={formData.expectations.includes("children")}
            onChange={() => handleCheckboxChange("expectations", "children")}
          />
          <CheckboxOption
            id="expectations-4"
            label="Eine ernsthafte langfristige Beziehung aber kein Zusammenleben"
            checked={formData.expectations.includes("serious-no-living-together")}
            onChange={() => handleCheckboxChange("expectations", "serious-no-living-together")}
          />
        </FormSection>

        <FormSection title="Wie stark ist Ihr Bedürfnis nach Freizeit gegenüber Arbeit?" required>
          <p className="text-sm text-gray-600 mb-2">Freizeit vs. Karriere</p>
          <RatingScale
            min={1}
            max={10}
            value={formData.lifeScores.leisure}
            onChange={(value) => handleNestedRatingChange("lifeScores", "leisure", value)}
            showLabels
            minLabel="Freizeit"
            maxLabel="Karriere"
          />
        </FormSection>

        <FormSection title="Wie wichtig sind Ihnen mutuelle Interessen?" required>
          <RatingScale
            min={1}
            max={10}
            value={formData.lifeScores.work}
            onChange={(value) => handleNestedRatingChange("lifeScores", "work", value)}
          />
        </FormSection>

        <FormSection title="Was schätzt du an gemeinsamen Hobbies?" required>
          <CheckboxOption
            id="hobbies-1"
            label="Wir haben die gleichen Interessen und Hobbies"
            checked={formData.hobbies.includes("same-interests")}
            onChange={() => handleCheckboxChange("hobbies", "same-interests")}
          />
          <CheckboxOption
            id="hobbies-2"
            label="Wir respektieren unsere unterschiedlichen Interessen"
            checked={formData.hobbies.includes("respect-differences")}
            onChange={() => handleCheckboxChange("hobbies", "respect-differences")}
          />
          <CheckboxOption
            id="hobbies-3"
            label="Wir interessieren uns für die Hobbies des anderen"
            checked={formData.hobbies.includes("interest-in-others")}
            onChange={() => handleCheckboxChange("hobbies", "interest-in-others")}
          />
          <CheckboxOption
            id="hobbies-4"
            label="Wir machen unsere eigenen Dinge"
            checked={formData.hobbies.includes("own-things")}
            onChange={() => handleCheckboxChange("hobbies", "own-things")}
          />
        </FormSection>

        <FormSection title="Welche Persönlichkeitsmerkmale betrachtest du als 'absolut wichtig'?" required>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {["Loyalität", "Ehrlichkeit", "Empathie", "Großzügigkeit", "Spontaneität", 
              "Struktur und Planung", "Zielstrebigkeit", "Offenheit", "Flexibilität", 
              "Sensibilität", "Individualität", "Selbständigkeit", "Verträglichkeit", 
              "Priorisierung", "Stabilität"].map((trait, index) => (
              <CheckboxOption
                key={index}
                id={`trait-${index}`}
                label={trait}
                checked={formData.importantRelationshipTraits.includes(trait)}
                onChange={() => handleCheckboxChange("importantRelationshipTraits", trait)}
              />
            ))}
          </div>
        </FormSection>

        <FormSection title="Wir viel gemeinsam verbrachte Zeit ist dir wichtig?" required>
          <RatingScale
            min={1}
            max={10}
            value={formData.timeTogether}
            onChange={(value) => handleRatingChange("timeTogether", value)}
            showLabels
            minLabel="Wenig"
            maxLabel="Viel"
          />
        </FormSection>

        <FormSection title="Welcher Persönlichkeitstyp bist du?" required>
          <RadioGroup value={formData.personalityType} className="space-y-1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                id="personality-1" 
                value="introvert" 
                onClick={() => handleRadioChange("personalityType", "introvert")}
              />
              <Label htmlFor="personality-1">Introvertiert</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                id="personality-2" 
                value="extrovert" 
                onClick={() => handleRadioChange("personalityType", "extrovert")}
              />
              <Label htmlFor="personality-2">Extrovertiert</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                id="personality-3" 
                value="ambivert" 
                onClick={() => handleRadioChange("personalityType", "ambivert")}
              />
              <Label htmlFor="personality-3">Ambivertiert (Mischtyp)</Label>
            </div>
          </RadioGroup>
        </FormSection>

        <FormSection title="Wie wichtig ist dir, dass du selbst bestimmst können wie dein Alltag oder deine Räumlichkeiten aussehen?" required>
          <RatingScale
            min={1}
            max={10}
            value={formData.emotionalSupport}
            onChange={(value) => handleRatingChange("emotionalSupport", value)}
          />
        </FormSection>

        <FormSection title="Wie offen stehst du einem Ortswechsel für die Beziehung gegenüber?" required>
          <RatingScale
            min={1}
            max={10}
            value={formData.financialGoals}
            onChange={(value) => handleRatingChange("financialGoals", value)}
          />
        </FormSection>

        <FormSection title="Wie viele Informationen teilst du über dein Privatleben mit anderen?" required>
          <RatingScale
            min={1}
            max={10}
            value={formData.communicationTendency}
            onChange={(value) => handleRatingChange("communicationTendency", value)}
          />
        </FormSection>

        <FormSection title="Wie wichtig du (eure) Familie / GEsellschaft?" required>
          <CheckboxOption
            id="family-1"
            label="Familie ist mir sehr wichtig und gehört ins gemeinsame Leben"
            checked={formData.familyImportance.includes("very-important")}
            onChange={() => handleCheckboxChange("familyImportance", "very-important")}
          />
          <CheckboxOption
            id="family-2"
            label="Familie hat für mich einen geringen Stellenwert"
            checked={formData.familyImportance.includes("less-important")}
            onChange={() => handleCheckboxChange("familyImportance", "less-important")}
          />
          <CheckboxOption
            id="family-3"
            label="Nur an Feiertagen"
            checked={formData.familyImportance.includes("holidays-only")}
            onChange={() => handleCheckboxChange("familyImportance", "holidays-only")}
          />
        </FormSection>

        <FormSection title="Wie offen Kommunizierst du bei...?" required>
          <RatingScale
            min={1}
            max={10}
            value={formData.conflictResolution}
            onChange={(value) => handleRatingChange("conflictResolution", value)}
          />
        </FormSection>

        <FormSection title="Wie wichtig ist dir Ordentlichkeit auf einer Skala?" required>
          <RatingScale
            min={1}
            max={10}
            value={formData.houseworkSplit}
            onChange={(value) => handleRatingChange("houseworkSplit", value)}
          />
        </FormSection>

        <FormSection title="Hast du Kinder oder wünscht Kinder in Zukunft?" required>
          <RadioGroup value={formData.childrenDesire} className="space-y-1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                id="children-1" 
                value="yes" 
                onClick={() => handleRadioChange("childrenDesire", "yes")}
              />
              <Label htmlFor="children-1">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                id="children-2" 
                value="no" 
                onClick={() => handleRadioChange("childrenDesire", "no")}
              />
              <Label htmlFor="children-2">Nein</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                id="children-3" 
                value="maybe" 
                onClick={() => handleRadioChange("childrenDesire", "maybe")}
              />
              <Label htmlFor="children-3">Vielleicht</Label>
            </div>
          </RadioGroup>
        </FormSection>

        <FormSection title="Wie wichtig ist dir Religion/Spiritualität?" required>
          <RatingScale
            min={1}
            max={10}
            value={formData.religionImportance}
            onChange={(value) => handleRatingChange("religionImportance", value)}
          />
        </FormSection>

        <FormSection title="Wie wichtig du gesellschaftliche und politische Themen?" required>
          <RatingScale
            min={1}
            max={10}
            value={formData.politicalViews}
            onChange={(value) => handleRatingChange("politicalViews", value)}
          />
        </FormSection>

        <FormSection title="Wie gehst du mit Geld um?" required>
          <CheckboxOption
            id="money-1"
            label="Ich plane langfristig, spare gerne und bin vorsichtig"
            checked={formData.moneyHandling.includes("saving")}
            onChange={() => handleCheckboxChange("moneyHandling", "saving")}
          />
          <CheckboxOption
            id="money-2"
            label="Ich bin eher spontan und gebe Geld aus wenn ich es habe"
            checked={formData.moneyHandling.includes("spontaneous")}
            onChange={() => handleCheckboxChange("moneyHandling", "spontaneous")}
          />
          <CheckboxOption
            id="money-3"
            label="Ich achte auf ein gutes Gleichgewicht zwischen sparen und genießen"
            checked={formData.moneyHandling.includes("balanced")}
            onChange={() => handleCheckboxChange("moneyHandling", "balanced")}
          />
          <CheckboxOption
            id="money-4"
            label="Mein Geld ist meine private Sache, da rede ich nicht drüber"
            checked={formData.moneyHandling.includes("private")}
            onChange={() => handleCheckboxChange("moneyHandling", "private")}
          />
        </FormSection>

        <FormSection title="Wie nimmst du neue Leute auf?" required>
          <RatingScale
            min={1}
            max={10}
            value={formData.socialLife}
            onChange={(value) => handleRatingChange("socialLife", value)}
          />
        </FormSection>

        <FormSection title="Wie wichtig ist dir gutes Essen/Trinken?" required>
          <RatingScale
            min={1}
            max={10}
            value={formData.friendsTime}
            onChange={(value) => handleRatingChange("friendsTime", value)}
          />
        </FormSection>

        <FormSection title="Wie wichtig ist dir eine gesunde Lebensweise?" required>
          <RatingScale
            min={1}
            max={10}
            value={formData.healthImportance}
            onChange={(value) => handleRatingChange("healthImportance", value)}
          />
        </FormSection>

        <FormSection title="Haustiere?" required>
          <RadioGroup value={formData.pets} className="space-y-1">
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                id="pets-1" 
                value="yes" 
                onClick={() => handleRadioChange("pets", "yes")}
              />
              <Label htmlFor="pets-1">Ja</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                id="pets-2" 
                value="no" 
                onClick={() => handleRadioChange("pets", "no")}
              />
              <Label htmlFor="pets-2">Nein</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                id="pets-3" 
                value="maybe" 
                onClick={() => handleRadioChange("pets", "maybe")}
              />
              <Label htmlFor="pets-3">Wäre zu überlegen</Label>
            </div>
          </RadioGroup>
        </FormSection>

        <FormSection title="Wie viele (gemeinsame) soziale Kontakte (außer Partner) sind für dich wünschenswert?" required>
          <RatingScale
            min={1}
            max={10}
            value={formData.sexualCompatibility}
            onChange={(value) => handleRatingChange("sexualCompatibility", value)}
          />
        </FormSection>

        <FormSection title="Welche Bedürfnisse sind dir für deine Weiterentwicklung und dein persönliches Wachstum wichtig?" required>
          <CheckboxOption
            id="acceptance-1"
            label="Ich brauche Freiheit"
            checked={formData.acceptanceNeeds.includes("freedom")}
            onChange={() => handleCheckboxChange("acceptanceNeeds", "freedom")}
          />
          <CheckboxOption
            id="acceptance-2"
            label="Bedingungslose Liebe und Akzeptanz für meine Eigenschaften"
            checked={formData.acceptanceNeeds.includes("unconditional-love")}
            onChange={() => handleCheckboxChange("acceptanceNeeds", "unconditional-love")}
          />
          <CheckboxOption
            id="acceptance-3"
            label="Ich möchte die Freiheit haben, mich zu ändern, wenn ich das möchte"
            checked={formData.acceptanceNeeds.includes("change-freedom")}
            onChange={() => handleCheckboxChange("acceptanceNeeds", "change-freedom")}
          />
        </FormSection>

        <FormSection title="Wie viel Unterstützung nimmst du an?" required>
          <RatingScale
            min={1}
            max={10}
            value={formData.overallRating}
            onChange={(value) => handleRatingChange("overallRating", value)}
          />
        </FormSection>

        <FormSection title="Gibt es bei Ihrer Wahl zum Einkommen auch eine Spanne, unterhalb der Sie nicht gehen möchten?" required>
          <Select 
            onValueChange={(value) => handleInputChange("incomeRequirements", value)}
            value={formData.incomeRequirements}
          >
            <SelectTrigger>
              <SelectValue placeholder="Bitte wählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="500">500€</SelectItem>
              <SelectItem value="1000">1000€</SelectItem>
              <SelectItem value="1500">1500€</SelectItem>
              <SelectItem value="2000">2000€</SelectItem>
              <SelectItem value="2500">2500€</SelectItem>
              <SelectItem value="3000">3000€</SelectItem>
              <SelectItem value="3500">3500€</SelectItem>
              <SelectItem value="4000+">4000€+</SelectItem>
            </SelectContent>
          </Select>
        </FormSection>

        <FormSection title="Wie gehst du mit Stress um?" required>
          <CheckboxOption
            id="stress-1"
            label="Ich ziehe mich zurück, brauche Zeit für mich"
            checked={formData.stressResponse.includes("retreat")}
            onChange={() => handleCheckboxChange("stressResponse", "retreat")}
          />
          <CheckboxOption
            id="stress-2"
            label="Ich brauche Gespräche, um mich zu entlasten"
            checked={formData.stressResponse.includes("talk")}
            onChange={() => handleCheckboxChange("stressResponse", "talk")}
          />
          <CheckboxOption
            id="stress-3"
            label="Ich werde leicht ungeduldig"
            checked={formData.stressResponse.includes("impatient")}
            onChange={() => handleCheckboxChange("stressResponse", "impatient")}
          />
          <CheckboxOption
            id="stress-4"
            label="Ich ignoriere Stress und mache weiter"
            checked={formData.stressResponse.includes("ignore")}
            onChange={() => handleCheckboxChange("stressResponse", "ignore")}
          />
        </FormSection>

        <FormSection title="Erzähl von deiner allerschönsten Erfahrung in einer Beziehung: Was hat dein Partner (oder Ex) damals gemacht, was du nie vergessen wirst?">
          <Textarea 
            placeholder="Deine Antwort hier..."
            value={formData.selfDescription}
            onChange={(e) => handleInputChange("selfDescription", e.target.value)}
            className="min-h-24"
          />
        </FormSection>

        <FormSection title="Beschreibe dich selbst:" required>
          <Textarea 
            placeholder="Deine Antwort hier..."
            value={formData.idealPartner}
            onChange={(e) => handleInputChange("idealPartner", e.target.value)}
            className="min-h-24"
          />
        </FormSection>

        <FormSection title="Kontakt:" required>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Dein Name</Label>
              <Input 
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="mt-1"
                placeholder="Dein Name"
              />
            </div>
            <div>
              <Label htmlFor="email">E-Mail</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1"
                placeholder="deine@email.de"
              />
            </div>
            <div>
              <Label htmlFor="age">Alter</Label>
              <Input 
                id="age" 
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="mt-1"
                placeholder="Dein Alter"
              />
            </div>
            <div>
              <Label htmlFor="gender">Geschlecht</Label>
              <Select 
                onValueChange={(value) => handleInputChange("gender", value)}
                value={formData.gender}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Bitte wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Männlich</SelectItem>
                  <SelectItem value="female">Weiblich</SelectItem>
                  <SelectItem value="diverse">Divers</SelectItem>
                  <SelectItem value="not-specified">Keine Angabe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </FormSection>

        <Button type="submit" className="mt-6 w-full bg-black text-white">Senden</Button>
      </div>
    </form>
  );
}

export default CompatibilityForm;
