import * as Survey from "survey-knockout";
import { SurveyLogic, SurveyLogicItem } from "../src/logic";
export default QUnit.module("LogicTabTests");

QUnit.test("Page visibility logic", function(assert) {
  var survey = new Survey.SurveyModel({});
  var logic = new SurveyLogic(survey);
  var pageVis = logic.getTypeByName("page_visibility");
  assert.ok(pageVis);
  assert.equal(pageVis.visible, false, "There is no pages");
  survey.addNewPage("p1");
  logic.update();
  pageVis = logic.getTypeByName("page_visibility");
  assert.equal(pageVis.visible, false, "There is one page only");
  survey.addNewPage("p2");
  logic.update();
  pageVis = logic.getTypeByName("page_visibility");
  assert.equal(pageVis.visible, true, "There are two pages");
});
QUnit.test("Question visibility logic", function(assert) {
  var survey = new Survey.SurveyModel({});
  survey.addNewPage("p1");
  var logic = new SurveyLogic(survey);
  var questionVis = logic.getTypeByName("question_visibility");
  assert.ok(questionVis);
  assert.equal(questionVis.visible, false, "There is no questions");
  survey.pages[0].addNewQuestion("text", "q1");
  assert.equal(survey.getAllQuestions().length, 1, "There is one question now");
  logic.update();
  questionVis = logic.getTypeByName("question_visibility");
  assert.equal(questionVis.visible, true, "There is a question");
});