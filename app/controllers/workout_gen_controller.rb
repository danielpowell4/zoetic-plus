class WorkoutGenController < ApplicationController
	before_filter :require_login

	def basic
	end


	private

	  def require_login
	    unless current_user
	      redirect_to root_path
	    end
	  end
	

end
