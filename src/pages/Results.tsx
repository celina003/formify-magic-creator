import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FormDataType } from "@/components/CompatibilityForm";
import { Download } from "lucide-react";
import { utils, write } from "xlsx";
import { saveAs } from "file-saver";

const Results = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormDataType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = sessionStorage.getItem("formData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
    setLoading(false);
  }, []);

  const exportToExcel = () => {
    if (!formData) return;

    try {
      // Create a worksheet from the form data
      const worksheet = utils.json_to_sheet([flattenFormData(formData)]);
      
      // Create a workbook with the worksheet
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Ergebnisse");
      
      // Generate Excel file
      const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
      
      // Save the file
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, `Zukunfts-Partner-Check_${formData.name || "Ergebnisse"}.xlsx`);
      
      toast({
        title: "Excel-Datei erstellt",
        description: "Die Ergebnisse wurden erfolgreich als Excel-Datei exportiert.",
      });
    } catch (error) {
      console.error("Excel-Export fehlgeschlagen:", error);
      toast({
        title: "Fehler beim Exportieren",
        description: "Die Excel-Datei konnte nicht erstellt werden.",
        variant: "destructive",
      });
    }
  };

  const flattenFormData = (data: FormDataType) => {
    // Convert nested objects and arrays to simple key-value pairs for Excel
    const result: Record<string, string | number> = {};
    
    Object.entries(data).forEach(([key, value]) => {
      if (key === "lifeScores") {
        // Properly handle the lifeScores object
        const lifeScores = value as FormDataType["lifeScores"];
        result["lifeScores_leisure"] = lifeScores.leisure || 0;
        result["lifeScores_work"] = lifeScores.work || 0;
      } else if (Array.isArray(value)) {
        result[key] = value.join(", ");
      } else if (typeof value === "object" && value !== null) {
        // Handle nested objects by flattening them
        Object.entries(value as Record<string, any>).forEach(([subKey, subValue]) => {
          result[`${key}_${subKey}`] = subValue !== null && subValue !== undefined ? String(subValue) : "";
        });
      } else {
        // Ensure non-object values are strings or numbers
        result[key] = value !== null && value !== undefined ? String(value) : "";
      }
    });
    
    return result;
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Lade Ergebnisse...</div>;
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full max-w-3xl mx-auto mb-8 bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Keine Daten gefunden</h1>
          <p className="text-gray-600 mb-6">
            Es wurden keine Formular-Daten gefunden. Bitte füllen Sie zunächst den Zukunfts-Partner-Check aus.
          </p>
          <Button onClick={() => window.location.href = "/"} className="mt-4">
            Zum Formular
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl mx-auto mb-8 bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Auswertung: Zukunfts-Partner-Check</h1>
          <Button onClick={exportToExcel} className="flex items-center gap-2">
            <Download size={16} />
            Excel exportieren
          </Button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Persönliche Daten</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{formData.name || "Nicht angegeben"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">E-Mail</p>
              <p className="font-medium">{formData.email || "Nicht angegeben"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Alter</p>
              <p className="font-medium">{formData.age || "Nicht angegeben"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Geschlecht</p>
              <p className="font-medium">
                {formData.gender === "male" ? "Männlich" : 
                 formData.gender === "female" ? "Weiblich" : 
                 formData.gender === "diverse" ? "Divers" : 
                 "Nicht angegeben"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <ResultSection 
            title="Beziehungserwartungen" 
            data={formData.expectations.join(", ")} 
          />
          
          <ResultSection 
            title="Freizeit vs. Karriere" 
            data={formData.lifeScores.leisure ? `${formData.lifeScores.leisure}/10` : "Nicht bewertet"} 
          />
          
          <ResultSection 
            title="Gemeinsame Hobbies" 
            data={formData.hobbies.join(", ")} 
          />
          
          <ResultSection 
            title="Wichtige Persönlichkeitsmerkmale" 
            data={formData.importantRelationshipTraits.join(", ")} 
          />
          
          <ResultSection 
            title="Persönlichkeitstyp" 
            data={
              formData.personalityType === "introvert" ? "Introvertiert" : 
              formData.personalityType === "extrovert" ? "Extrovertiert" : 
              formData.personalityType === "ambivert" ? "Ambivertiert (Mischtyp)" : 
              "Nicht angegeben"
            } 
          />
          
          <ResultSection 
            title="Familienwichtigkeit" 
            data={formData.familyImportance.join(", ")} 
          />
          
          <ResultSection 
            title="Kinderwunsch" 
            data={
              formData.childrenDesire === "yes" ? "Ja" : 
              formData.childrenDesire === "no" ? "Nein" : 
              formData.childrenDesire === "maybe" ? "Vielleicht" : 
              "Nicht angegeben"
            } 
          />
          
          <ResultSection 
            title="Religion/Spiritualität" 
            data={formData.religionImportance ? `${formData.religionImportance}/10` : "Nicht bewertet"} 
          />
          
          <ResultSection 
            title="Umgang mit Geld" 
            data={formData.moneyHandling.join(", ")} 
          />
          
          <ResultSection 
            title="Haustiere" 
            data={
              formData.pets === "yes" ? "Ja" : 
              formData.pets === "no" ? "Nein" : 
              formData.pets === "maybe" ? "Wäre zu überlegen" : 
              "Nicht angegeben"
            } 
          />
          
          <ResultSection 
            title="Stress-Reaktion" 
            data={formData.stressResponse.join(", ")} 
          />
          
          <ResultSection 
            title="Selbstbeschreibung" 
            data={formData.idealPartner || "Keine Angabe"} 
            isLongText 
          />
        </div>

        <div className="flex justify-between mt-10">
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            Zurück zum Formular
          </Button>
          <Button onClick={exportToExcel} className="flex items-center gap-2">
            <Download size={16} />
            Excel exportieren
          </Button>
        </div>
      </div>
    </div>
  );
};

const ResultSection = ({ 
  title, 
  data, 
  isLongText = false 
}: { 
  title: string; 
  data: string; 
  isLongText?: boolean 
}) => {
  return (
    <div className="border-b pb-4">
      <h3 className="font-medium text-lg mb-2">{title}</h3>
      <p className={isLongText ? "text-sm text-gray-700 whitespace-pre-line" : "text-sm text-gray-700"}>
        {data || "Keine Angabe"}
      </p>
    </div>
  );
};

export default Results;
