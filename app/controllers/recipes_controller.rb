class RecipesController < ApplicationController

  before_action :find_recipe, only: [:show, :edit, :update, :destroy]

  def index
    if params[:tag]
      @recipe = Recipe.tagged_with(params[:tag]).order("created_at DESC")
    else
      @recipe = Recipe.all.order("created_at DESC")
    end
  end

  def show
  end

  def new
    @recipe = Recipe.new
  end

  def create
    @recipe = Recipe.new(recipe_params)
    if @recipe.save
      redirect_to @recipe, notice: "Successfully created new recipe"
    else
      render 'new'
    end
  end

  def edit
  end

  def update
    if @recipe.update(recipe_params)
      redirect_to @recipe
    else
      render 'edit'
    end
  end

  def destroy
    @recipe.destroy
    redirect_to root_path, notice: "Successfully deleted recipe!!"
  end

  private

  def recipe_params
    params.require(:recipe).permit(:title, :description, :image, :tag_list, ingredients_attributes:[:id, :name, :amount, :_destroy], directions_attributes:[:id, :step, :_destroy], reasons_attributes:[:id, :title, :description, :_destroy])
  end

  def find_recipe
    @recipe = Recipe.find(params[:id])
  end


end
