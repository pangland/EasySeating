class Api::SessionsController < ApplicationController
  def create
    @user = User.find_user_by_credentials(user_params[:username], user_params[:password])
    if @user
      login(@user)
      @reservations = @user.reservations.includes(:slot)
      render 'api/session/show'
    else
      errors = ['Invalid creds']
      render json: errors, status: 401
    end

  end

  def destroy
    if current_user
      logout
      if session[:session_token].nil?
        render json: {}
        return
      end
    end
    render json: ["No user to log out"], status: 404
  end

end
