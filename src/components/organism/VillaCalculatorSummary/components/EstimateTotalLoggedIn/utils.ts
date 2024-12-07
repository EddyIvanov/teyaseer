type T_BudgetDetails = Array<{ level: string; value: number }>;

export const renderUsersBudget = (
  budget: number,
  levels: T_BudgetDetails,
  selectedLevel?: string | null
) => {
  const renderLevels = (values: any[], yourBudget: number) => {
    const levels = ['basic', 'mid', 'high'];
    let budgetInserted = false;
    const result = [];

    levels.forEach(level => {
      const valueObject = values.find(item => item.level === level);

      if (valueObject.value === 0) return null;
      if (
        !budgetInserted &&
        valueObject.value > yourBudget &&
        valueObject.value > 0
      ) {
        result.push({ level: 'yourBudget', value: yourBudget });
        budgetInserted = true;
      }
      result.push(valueObject);
    });

    if (!budgetInserted && yourBudget > 0) {
      result.push({ level: 'yourBudget', value: yourBudget });
    }

    return result;
  };

  const result = renderLevels(levels, budget);

  const budgetIndex = result.findIndex(res => res.level === 'yourBudget');

  const selectedBudget = result.find(res => res.level === selectedLevel);

  const isCostHigher = selectedBudget?.value
    ? selectedBudget?.value > budget
    : false;

  return { result, budgetIndex, isCostHigher };
};
