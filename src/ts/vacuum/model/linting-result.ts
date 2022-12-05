export interface Location {
  character: number;
  line: number;
}

export interface LocationRange {
  start: Location;
  end: Location;
}

export interface LintingResult {
  message: string;
  path: string;
  range: LocationRange;
  ruleId: string;
  ruleSeverity: string;
}

export interface SpecInfo {
  fileType: string;
  format: string;
  type: string;
  version: string;
}

export interface CategoryStatistics {
  categoryId: string;
  categoryName: string;
  errors: number;
  hints: number;
  info: number;
  numIssues: number;
  score: number;
  warnings: number;
}

export interface Statistics {
  categoryStatistics: CategoryStatistics;
  enums: number;
  filesizeBytes: number;
  filesizeKb: number;
  operations: number;
  overallScore: number;
  parameters: number;
  paths: number;
  references: number;
  security: number;
  specFormat: string;
  specType: string;
  totalErrors: number;
  totalInfo: number;
  totalWarnings: number;
  version: string;
}

export interface LintingResults {
  uploadedText: string;
  generated: string;
  resultSet: Array<LintingResult>;
  specInfo: SpecInfo;
  statistics: Statistics;
}
