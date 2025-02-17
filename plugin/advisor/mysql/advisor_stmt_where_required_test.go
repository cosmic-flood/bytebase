package mysql

import (
	"testing"

	"github.com/bytebase/bytebase/plugin/advisor"
)

func TestWhereRequirement(t *testing.T) {
	tests := []advisor.TestCase{
		{
			Statement: "INSERT INTO t values (1)",
			Want: []advisor.Advice{
				{
					Status:  advisor.Success,
					Code:    advisor.Ok,
					Title:   "OK",
					Content: "",
				},
			},
		},
		{
			Statement: "DELETE FROM t1",
			Want: []advisor.Advice{
				{
					Status:  advisor.Warn,
					Code:    advisor.StatementNoWhere,
					Title:   "statement.where.require",
					Content: "\"DELETE FROM t1\" requires WHERE clause",
					Line:    1,
				},
			},
		},
		{
			Statement: "UPDATE t1 SET a = 1",
			Want: []advisor.Advice{
				{
					Status:  advisor.Warn,
					Code:    advisor.StatementNoWhere,
					Title:   "statement.where.require",
					Content: "\"UPDATE t1 SET a = 1\" requires WHERE clause",
					Line:    1,
				},
			},
		},
		{
			Statement: "DELETE FROM t1 WHERE a > 0",
			Want: []advisor.Advice{
				{
					Status:  advisor.Success,
					Code:    advisor.Ok,
					Title:   "OK",
					Content: "",
				},
			},
		},
		{
			Statement: "UPDATE t1 SET a = 1 WHERE a > 10",
			Want: []advisor.Advice{
				{
					Status:  advisor.Success,
					Code:    advisor.Ok,
					Title:   "OK",
					Content: "",
				},
			},
		},
		{
			Statement: "SELECT a FROM t",
			Want: []advisor.Advice{
				{
					Status:  advisor.Warn,
					Code:    advisor.StatementNoWhere,
					Title:   "statement.where.require",
					Content: "\"SELECT a FROM t\" requires WHERE clause",
					Line:    1,
				},
			},
		},
		{
			Statement: "SELECT a FROM t WHERE a > 0",
			Want: []advisor.Advice{
				{
					Status:  advisor.Success,
					Code:    advisor.Ok,
					Title:   "OK",
					Content: "",
				},
			},
		},
		{
			Statement: "SELECT a FROM t WHERE a > (SELECT max(id) FROM user)",
			Want: []advisor.Advice{
				{
					Status:  advisor.Warn,
					Code:    advisor.StatementNoWhere,
					Title:   "statement.where.require",
					Content: "\"SELECT a FROM t WHERE a > (SELECT max(id) FROM user)\" requires WHERE clause",
					Line:    1,
				},
			},
		},
	}

	advisor.RunSQLReviewRuleTests(t, tests, &WhereRequirementAdvisor{}, &advisor.SQLReviewRule{
		Type:    advisor.SchemaRuleStatementRequireWhere,
		Level:   advisor.SchemaRuleLevelWarning,
		Payload: "",
	}, advisor.MockMySQLDatabase)
}
