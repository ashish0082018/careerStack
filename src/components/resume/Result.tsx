'use client'
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Lightbulb, ArrowRight } from "lucide-react";

type ResultProps = {
  analysisResults: {
    category: string;
    issue: string;
    suggestion: string;
    priority: "low" | "medium" | "high";
    lineReplacement?: {
      original: string;
      suggested: string;
    };
  }[];
};

// Helper function for badge color
function getPriorityColor(priority: string) {
  switch (priority) {
    case "high":
      return "bg-red-500 text-white";
    case "medium":
      return "bg-yellow-500 text-white";
    case "low":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-300 text-black";
  }
}

function Result({ analysisResults }: ResultProps) {
  return (
    <div>
      <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Analysis Results
          </CardTitle>
          <p className="text-muted-foreground">
            Here are the AI-generated suggestions to improve your resume:
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysisResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
                  index % 2 === 0 ? "bg-muted/30" : "bg-background/50"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground">{result.category}</h3>
                      <Badge className={getPriorityColor(result.priority)}>
                        {result.priority} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Issue:</strong> {result.issue}
                    </p>
                    <p className="text-sm text-foreground">
                      <strong>Suggestion:</strong> {result.suggestion}
                    </p>

                    {result.lineReplacement && (
                      <div className="mt-4 p-3 bg-muted/50 rounded-md border-l-4 border-primary/50">
                        <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-1">
                          <ArrowRight className="w-3 h-3" />
                          Suggested Line Replacement:
                        </h4>
                        <div className="space-y-2">
                          <div className="text-xs">
                            <span className="text-red-600 dark:text-red-400 font-medium">Original:</span>
                            <p className="mt-1 p-2 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300 rounded text-sm italic border-l-2 border-red-300">
                              "{result.lineReplacement.original}"
                            </p>
                          </div>
                          <div className="text-xs">
                            <span className="text-green-600 dark:text-green-400 font-medium">Suggested:</span>
                            <p className="mt-1 p-2 bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-300 rounded text-sm font-medium border-l-2 border-green-300">
                              "{result.lineReplacement.suggested}"
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h3 className="font-medium text-primary">Pro Tip</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Implement these suggestions one by one and re-upload your resume for updated analysis. 
              Focus on high-priority items first for maximum impact on your ATS score. Use the line replacements as direct copy-paste suggestions for your resume.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Result;
